// ========== 沈药毕业自测系统 - 数据同步适配层（三模式版） ==========
// 模式优先级：Supabase 云端 > 本地 Node.js Server > localStorage
// 对 DB 对象和前端组件完全透明

const SyncAPI = {
  _mode: 'local',           // 'supabase' | 'server' | 'local'
  _supabaseClient: null,
  _serverAvailable: false,
  _baseUrl: '',

  // ========== 云端配置 ==========
  // 注册 https://supabase.com → 新建项目 → Settings → API → 复制以下两项
  // 填入后即可启用云端模式，任何设备访问同一 URL 共享数据
  SUPABASE_URL: 'https://ddgfevzcvxpuyufmopwn.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZ2ZldnpjdnhwdXl1Zm1vcHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NjE1MTIsImV4cCI6MjA5NTIzNzUxMn0.3oJcRsrtJ6REhdVvmkyRkisBn459fzX-_uMX99Ji1Bs',

  // ========== 同步接口（供 DB 对象使用）==========
  // getItem / setItem / removeItem 对前端同步，立即操作 localStorage + 异步同步到云端/服务器

  getItem(key, defaultVal) {
    var raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
    return defaultVal !== undefined ? defaultVal : null;
  },

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    this._asyncSave(key, value);
  },

  removeItem(key) {
    localStorage.removeItem(key);
    this._asyncRemove(key);
  },

  // ========== 状态查询 ==========

  getMode() { return this._mode; },
  isServerAvailable() { return this._mode !== 'local'; },
  isCloud() { return this._mode === 'supabase'; },

  getSyncStatus() {
    switch (this._mode) {
      case 'supabase': return { status: 'cloud', text: '云端模式（数据已同步到 Supabase）', mode: 'supabase' };
      case 'server':   return { status: 'online', text: '服务器模式（数据已同步到本地服务器）', mode: 'server' };
      default:          return { status: 'offline', text: '本地模式（数据仅保存在本机浏览器）', mode: 'local' };
    }
  },

  // ========== 异步写入（不阻塞 UI）==========

  _asyncSave(key, value) {
    if (this._mode === 'supabase') {
      this._supabaseUpsert(key, value).catch(function(e) {
        console.warn('[SyncAPI] 云端保存失败:', e);
      });
    } else if (this._mode === 'server') {
      this._serverPost(key, value).catch(function(e) {
        console.warn('[SyncAPI] 服务器保存失败，降级本地模式');
      });
    }
  },

  _asyncRemove(key) {
    if (this._mode === 'supabase') {
      this._supabaseClient.from('app_data').delete().eq('key', key).then(function() {}, function() {});
    } else if (this._mode === 'server') {
      this._serverPost(key, null).catch(function() {});
    }
  },

  // ========== 初始化（异步，页面加载时调用）==========

  async init() {
    // 检测 baseUrl（本地 server 用）
    if (location.protocol === 'file:') {
      this._baseUrl = 'http://localhost:8900';
    } else {
      this._baseUrl = location.origin;
    }

    // 1. 尝试 Supabase 云端模式
    if (this.SUPABASE_URL && this.SUPABASE_KEY && typeof supabase !== 'undefined') {
      try {
        this._supabaseClient = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
        // 测试连接
        var result = await this._supabaseClient.from('app_data').select('key').limit(1);
        if (!result.error) {
          this._mode = 'supabase';
          console.log('[SyncAPI] 云端模式: 已连接 Supabase');
          // 首次连接：从云端拉取所有数据到 localStorage
          await this._syncFromCloud();
          return;
        } else {
          console.warn('[SyncAPI] Supabase 连接失败:', result.error.message);
        }
      } catch (e) {
        console.warn('[SyncAPI] Supabase 连接异常:', e.message);
      }
    }

    // 2. 尝试本地 Node.js 服务器模式
    try {
      var controller = new AbortController();
      var timer = setTimeout(function() { controller.abort(); }, 3000);
      var res = await fetch(this._baseUrl + '/api/health', { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        var health = await res.json();
        if (health.ok) {
          this._mode = 'server';
          console.log('[SyncAPI] 服务器模式: 已连接 localhost:' + this._baseUrl.split(':').pop());
          return;
        }
      }
    } catch (e) {
      // 服务器不可用
    }

    // 3. 降级 localStorage
    this._mode = 'local';
    console.log('[SyncAPI] 本地模式: 数据仅保存在当前浏览器');
  },

  // ========== Supabase 云端操作 ==========

  async _supabaseUpsert(key, value) {
    var result = await this._supabaseClient
      .from('app_data')
      .upsert({ key: key, value: value }, { onConflict: 'key' });
    if (result.error) throw result.error;
  },

  async _supabaseGet(key) {
    var result = await this._supabaseClient
      .from('app_data')
      .select('value')
      .eq('key', key)
      .single();
    if (result.error) return null;
    return result.data ? result.data.value : null;
  },

  async _syncFromCloud() {
    try {
      var result = await this._supabaseClient.from('app_data').select('key, value');
      if (result.error || !result.data) return;
      var synced = 0;
      for (var i = 0; i < result.data.length; i++) {
        var row = result.data[i];
        localStorage.setItem(row.key, JSON.stringify(row.value));
        synced++;
      }
      console.log('[SyncAPI] 从云端同步了 ' + synced + ' 条数据到本地');
    } catch (e) {
      console.warn('[SyncAPI] 云端同步失败:', e.message);
    }
  },

  // ========== 本地服务器操作 ==========

  async _serverPost(key, data) {
    var res = await fetch(this._baseUrl + '/api/data/' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Server POST failed');
  },

  async _serverGet(key) {
    var res = await fetch(this._baseUrl + '/api/data/' + encodeURIComponent(key));
    if (!res.ok) throw new Error('Server GET failed');
    var json = await res.json();
    return json.data;
  },

  // ========== 全量同步（从当前数据源拉取所有数据到 localStorage）==========

  async syncFromServer() {
    if (this._mode === 'supabase') {
      await this._syncFromCloud();
      return true;
    } else if (this._mode === 'server') {
      try {
        var res = await fetch(this._baseUrl + '/api/health');
        if (!res.ok) return false;
        var health = await res.json();
        var keys = Object.keys(health.stats || {});
        var synced = 0;
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var d = await this._serverGet('gc_' + k);
          if (d !== null) { localStorage.setItem('gc_' + k, JSON.stringify(d)); synced++; }
          var d2 = await this._serverGet(k);
          if (d2 !== null) { localStorage.setItem(k, JSON.stringify(d2)); synced++; }
        }
        console.log('[SyncAPI] 从服务器同步了 ' + synced + ' 条数据');
        return true;
      } catch (e) { return false; }
    }
    return false;
  },
};
