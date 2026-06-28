// ========== 沈药毕业自测系统 - 数据层（三专业版 + 学生导入 + 文件通知） ==========

// SyncAPI兼容：浏览器环境使用sync_api.js适配层，Node.js环境使用全局挂载
if (typeof SyncAPI === 'undefined') {
  // Node.js环境（server端require时）：挂载到global，避免与const冲突
  if (typeof globalThis !== 'undefined') {
    globalThis.SyncAPI = {
      getItem: function(key, defaultVal) {
        if (typeof localStorage !== 'undefined') {
          var v = localStorage.getItem(key);
          return v !== null ? JSON.parse(v) : (defaultVal !== undefined ? defaultVal : null);
        }
        return defaultVal !== undefined ? defaultVal : null;
      },
      setItem: function(key, value) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(value));
        }
      },
      removeItem: function(key) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
      }
    };
  }
}

// ========== 沈药毕业自测系统 - 数据层（三专业版） ==========
const MajorData = {
  'business_admin': {
    name: '工商管理（2023级）',
    code: '120201K',
    totalCredits: 152,
    requiredCredits: 110.5,
    electiveCredits: 41.5,
    degreeType: '管理学学士',
    duration: 4,
    maxYears: 6,
    gpaDegree: 2.0,
    platforms: [
      {id:'general',name:'通识教育课程',required:44.5,elective:0,modules:[
        {id:'sizheng',name:'思政类',required:17,elective:1},
        {id:'foreign',name:'外语类',required:6,elective:3},
        {id:'military_pe',name:'军事体育类',required:5.5,elective:0},
        {id:'art',name:'艺术类',required:0,elective:1},
        {id:'humanities',name:'人文社科与医学基础类',required:2,elective:2},
        {id:'computer',name:'计算机与信息技术类',required:0,elective:3},
        {id:'innovation',name:'创新创业类',required:2,elective:0},
        {id:'health',name:'健康教育类',required:2,elective:0}
      ]},
      {id:'foundation',name:'大类及学科基础课程',required:45.5,elective:0,modules:[
        {id:'math',name:'数学类',required:10,elective:0},
        {id:'discipline',name:'学科基础课程',required:27.5,elective:8}
      ]},
      {id:'professional',name:'专业课程',required:36.5,elective:0,modules:[
        {id:'prof_req',name:'专业必修',required:20,elective:0},
        {id:'prof_elec',name:'专业选修',required:0,elective:13.5},
        {id:'integrate',name:'整合课程',required:3,elective:0}
      ]},
      {id:'practice',name:'综合实践教学',required:18.5,elective:0,modules:[
        {id:'mil_train',name:'军事技能训练',required:1.5,elective:0},
        {id:'internship',name:'专业实习实训',required:1,elective:0},
        {id:'thesis',name:'毕业设计/毕业论文',required:11,elective:0},
        {id:'labor',name:'劳动',required:2,elective:0},
        {id:'second_class',name:'第二课堂',required:3,elective:0}
      ]},
      {id:'personal',name:'个性化培养课程',required:0,elective:7,modules:[
        {id:'free_elec',name:'个性化选修课程',required:0,elective:7}
      ]}
    ],    courses: [
      {code:'1010410CL',name:'思想道德与法治',credits:2.5,hours:40,semester:1,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS05',name:'思想政治理论实践课（思想道德与法治）',credits:0.5,hours:8,semester:1,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110BL',name:'马克思主义基本原理',credits:2.5,hours:40,semester:2,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS02',name:'思想政治理论实践课（马克思主义基本原理）',credits:0.5,hours:8,semester:2,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010210CL',name:'中国近现代史纲要',credits:2.5,hours:40,semester:3,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS03',name:'思想政治理论实践课（中国近现代史纲要）',credits:0.5,hours:8,semester:3,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010310DL',name:'毛泽东思想和中国特色社会主义理论体系概论',credits:2.5,hours:40,semester:4,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS04',name:'思想政治理论实践课（毛泽东思想和中国特色社会主义理论体系概论）',credits:0.5,hours:8,semester:4,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'5016410BL',name:'习近平新时代中国特色社会主义思想概论',credits:3,hours:48,semester:5,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1014200AL',name:'形势与政策',credits:2,hours:64,semester:0,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1070110EZ',name:'大学英语I',credits:2.5,hours:48,semester:1,type:'required',platform:'general',module:'foreign',category:'必修'},
      {code:'1070100DZ',name:'大学英语II',credits:3.5,hours:64,semester:2,type:'required',platform:'general',module:'foreign',category:'必修'},
      {code:'1070110QL',name:'大学英语III',credits:1.5,hours:24,semester:3,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073210BL',name:'大学英语翻译与写作',credits:1.5,hours:24,semester:3,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1070120HL',name:'大学英语IV',credits:1.5,hours:24,semester:4,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073310BL',name:'实用英语口语',credits:1.5,hours:24,semester:4,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1130110BZ',name:'体育I',credits:1,hours:30,semester:1,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110DZ',name:'体育II',credits:1,hours:30,semester:2,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110EZ',name:'体育III',credits:1,hours:30,semester:3,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110FZ',name:'体育IV',credits:1,hours:30,semester:4,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1140100AL',name:'军事理论',credits:1.5,hours:24,semester:1,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'4144500BL',name:'美术鉴赏',credits:0.5,hours:8,semester:1,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144400BL',name:'音乐鉴赏',credits:0.5,hours:8,semester:1,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4010600CL',name:'中华优秀传统文化',credits:1,hours:16,semester:2,type:'required',platform:'general',module:'humanities',category:'必修'},
      {code:'1073100BL',name:'应用写作',credits:1,hours:16,semester:2,type:'required',platform:'general',module:'humanities',category:'必修'},
      {code:'1144200AZ',name:'大学生职业发展与创业就业指导',credits:2,hours:40,semester:2,type:'required',platform:'general',module:'innovation',category:'必修'},
      {code:'4140800BL',name:'大学生心理健康教育',credits:2,hours:36,semester:1,type:'required',platform:'general',module:'health',category:'必修'},
      {code:'1060110GL',name:'高等数学I',credits:3,hours:56,semester:1,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060100DL',name:'高等数学II',credits:3,hours:64,semester:2,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060200CL',name:'概率论与数理统计',credits:2,hours:40,semester:3,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'4060300DL',name:'线性代数',credits:2,hours:32,semester:3,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'2032710AL',name:'大学化学I',credits:2.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2032710AS',name:'大学化学实验I',credits:1.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2032710BL',name:'大学化学II',credits:3,hours:64,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2032710BS',name:'大学化学实验II',credits:1,hours:32,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4027810CL',name:'经济学',credits:4,hours:80,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022910CL',name:'会计学',credits:2,hours:40,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022910AS',name:'会计学实验',credits:0.5,hours:16,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4027710AL',name:'国际商务',credits:2.5,hours:48,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2021810BL',name:'管理学',credits:2.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2027310BL',name:'应用统计学',credits:1.5,hours:24,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2027310AS',name:'应用统计学实验',credits:0.5,hours:16,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4023010CL',name:'运筹学',credits:2,hours:32,semester:5,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022510CL',name:'经济法',credits:2,hours:32,semester:5,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4020500AL',name:'技术经济学',credits:2,hours:32,semester:6,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2021210BL',name:'药事管理学',credits:2,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4020800AL',name:'药物经济学',credits:2,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'1062110AL',name:'大学数学进阶',credits:2,hours:32,semester:4,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4020400AL',name:'博弈论',credits:2,hours:32,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},      {code:'2024010BL',name:'市场营销学',credits:2.5,hours:48,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3021000CL',name:'组织行为学',credits:1,hours:16,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3022310BL',name:'财务管理',credits:1.5,hours:24,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4025810BL',name:'人力资源管理',credits:1,hours:16,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'1016210AL',name:'创业学',credits:2,hours:40,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4028510CL',name:'公司治理',credits:1.5,hours:24,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4022210CL',name:'战略管理',credits:2,hours:32,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3080510AL',name:'管理信息系统',credits:2,hours:32,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3080510AS',name:'管理信息系统实验',credits:0.5,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4026100AL',name:'计量经济学',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4026110AS',name:'计量经济学实验',credits:0.5,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3151010AL',name:'运营管理',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3029810BL',name:'企业资源计划',credits:1.5,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3151610AS',name:'工商管理创新整合课程',credits:3,hours:96,semester:8,type:'required',platform:'professional',module:'integrate',category:'必修'},
      {code:'4023710AL',name:'医药电子商务',credits:2,hours:32,semester:6,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4028210AL',name:'管理心理学',credits:2.5,hours:48,semester:5,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4026910BL',name:'国际经济合作',credits:2,hours:32,semester:7,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4024100AL',name:'医药消费行为学',credits:2,hours:32,semester:7,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3029910AL',name:'商务沟通',credits:1.5,hours:24,semester:6,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3026510AL',name:'市场调查与预测',credits:1.5,hours:32,semester:7,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3026000AL',name:'质量管理',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'1140210BS',name:'军事技能训练',credits:1.5,hours:0,semester:1,type:'required',platform:'practice',module:'mil_train',category:'必修'},
      {code:'PRACTICE_INTER',name:'专业实习实训',credits:1,hours:0,semester:7,type:'required',platform:'practice',module:'internship',category:'必修'},
      {code:'PRACTICE_THESIS',name:'毕业设计/毕业论文',credits:11,hours:0,semester:8,type:'required',platform:'practice',module:'thesis',category:'必修'},
      {code:'PRACTICE_LABOR',name:'劳动',credits:2,hours:0,semester:0,type:'required',platform:'practice',module:'labor',category:'必修'},
      {code:'PRACTICE_2ND',name:'第二课堂',credits:3,hours:0,semester:0,type:'required',platform:'practice',module:'second_class',category:'必修'}
    ]
  },  'marketing': {
    name: '市场营销（2023级）',
    code: '120202',
    totalCredits: 152,
    requiredCredits: 111,
    electiveCredits: 41,
    degreeType: '管理学学士',
    duration: 4,
    maxYears: 6,
    gpaDegree: 2.0,
    platforms: [
      {id:'general',name:'通识教育课程',required:44.5,elective:0,modules:[
        {id:'sizheng',name:'思政类',required:17,elective:1},
        {id:'foreign',name:'外语类',required:6,elective:3},
        {id:'military_pe',name:'军事体育类',required:5.5,elective:0},
        {id:'art',name:'艺术类',required:0,elective:1},
        {id:'humanities',name:'人文社科与医学基础类',required:2,elective:2},
        {id:'computer',name:'计算机与信息技术类',required:0,elective:3},
        {id:'innovation',name:'创新创业类',required:2,elective:0},
        {id:'health',name:'健康教育类',required:2,elective:0}
      ]},
      {id:'foundation',name:'大类及学科基础课程',required:43.5,elective:0,modules:[
        {id:'math',name:'数学类',required:10,elective:0},
        {id:'discipline',name:'学科基础课程',required:25.5,elective:8}
      ]},
      {id:'professional',name:'专业课程',required:38,elective:0,modules:[
        {id:'prof_req',name:'专业必修',required:23,elective:0},
        {id:'prof_elec',name:'专业选修',required:0,elective:12.5},
        {id:'integrate',name:'整合课程',required:2.5,elective:0}
      ]},
      {id:'practice',name:'综合实践教学',required:15.5,elective:0,modules:[
        {id:'mil_train',name:'军事技能训练',required:1.5,elective:0},
        {id:'internship',name:'专业实习实训',required:1,elective:0},
        {id:'thesis',name:'毕业设计/毕业论文',required:11,elective:0},
        {id:'labor',name:'劳动',required:2,elective:0}
      ]},
      {id:'second_class_platform',name:'第二课堂',required:0,elective:3,modules:[
        {id:'second_class',name:'第二课堂',required:0,elective:3}
      ]},
      {id:'personal',name:'个性化培养课程',required:0,elective:7.5,modules:[
        {id:'free_elec',name:'个性化选修课程',required:0,elective:7.5}
      ]}
    ],    courses: [
      {code:'1010410CL',name:'思想道德与法治',credits:2.5,hours:40,semester:1,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS05',name:'思想政治理论实践课（思想道德与法治）',credits:0.5,hours:8,semester:1,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110BL',name:'马克思主义基本原理',credits:2.5,hours:40,semester:2,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS02',name:'思想政治理论实践课（马克思主义基本原理）',credits:0.5,hours:8,semester:2,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010210CL',name:'中国近现代史纲要',credits:2.5,hours:40,semester:3,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS03',name:'思想政治理论实践课（中国近现代史纲要）',credits:0.5,hours:8,semester:3,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010310DL',name:'毛泽东思想和中国特色社会主义理论体系概论',credits:2.5,hours:40,semester:4,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS04',name:'思想政治理论实践课（毛泽东思想和中国特色社会主义理论体系概论）',credits:0.5,hours:8,semester:4,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'5016410BL',name:'习近平新时代中国特色社会主义思想概论',credits:3,hours:48,semester:5,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1014200AL',name:'形势与政策',credits:2,hours:64,semester:0,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1016310BL',name:'党史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1016310CL',name:'新中国史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1016310DL',name:'改革开放史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1016310EL',name:'社会主义发展史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},      {code:'1070110EZ',name:'大学英语I',credits:2.5,hours:48,semester:1,type:'required',platform:'general',module:'foreign',category:'必修'},
      {code:'1070100DZ',name:'大学英语II',credits:3.5,hours:64,semester:2,type:'required',platform:'general',module:'foreign',category:'必修'},
      {code:'1070110QL',name:'大学英语III',credits:1.5,hours:24,semester:3,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073210BL',name:'大学英语翻译与写作',credits:1.5,hours:24,semester:3,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1070120HL',name:'大学英语IV',credits:1.5,hours:24,semester:4,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073310BL',name:'实用英语口语',credits:1.5,hours:24,semester:4,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1072511BL',name:'职场商务英语',credits:1.5,hours:24,semester:5,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073410CL',name:'跨文化交际',credits:1.5,hours:24,semester:5,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073510BL',name:'实用英语写作',credits:1.5,hours:24,semester:5,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073710BL',name:'翻译技巧与实践',credits:1.5,hours:24,semester:6,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'4072100BL',name:'药学实用英语',credits:1.5,hours:24,semester:6,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1074010BL',name:'药学英文文献导读',credits:1.5,hours:24,semester:7,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073910BL',name:'学术英语阅读',credits:1.5,hours:24,semester:7,type:'elective',platform:'general',module:'foreign',category:'选修'},      {code:'1130110BZ',name:'体育I',credits:1,hours:30,semester:1,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110DZ',name:'体育II',credits:1,hours:30,semester:2,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110EZ',name:'体育III',credits:1,hours:30,semester:3,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110FZ',name:'体育IV',credits:1,hours:30,semester:4,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1140100AL',name:'军事理论',credits:1.5,hours:24,semester:1,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'4144500BL',name:'美术鉴赏',credits:0.5,hours:8,semester:1,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144400BL',name:'音乐鉴赏',credits:0.5,hours:8,semester:1,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144800BL',name:'书法鉴赏',credits:0.5,hours:8,semester:2,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144700BL',name:'戏曲鉴赏',credits:0.5,hours:8,semester:2,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4010600CL',name:'中华优秀传统文化',credits:1,hours:16,semester:2,type:'required',platform:'general',module:'humanities',category:'必修'},
      {code:'1073100BL',name:'应用写作',credits:1,hours:16,semester:2,type:'required',platform:'general',module:'humanities',category:'必修'},
      {code:'4012010AL',name:'演讲与口才',credits:1,hours:16,semester:3,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4012000AL',name:'社交礼仪',credits:1,hours:16,semester:3,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4011400AL',name:'医药伦理学',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4010910AL',name:'逻辑与思辨',credits:1,hours:16,semester:5,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4051100BL',name:'中医学基础',credits:1,hours:16,semester:5,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4051000AL',name:'医学导论',credits:1,hours:16,semester:6,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'1080100BL',name:'大学计算机基础',credits:1,hours:16,semester:3,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080100BS',name:'大学计算机基础实验',credits:0.5,hours:16,semester:3,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'4082300AL',name:'Office高级应用',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'4082300AS',name:'Office高级应用实验',credits:0.5,hours:16,semester:4,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080200EL',name:'计算机程序设计（Python）基础',credits:1,hours:16,semester:5,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210ES',name:'计算机程序设计（Python）基础实验',credits:0.5,hours:16,semester:5,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080200CL',name:'计算机程序设计（Python）',credits:2,hours:32,semester:6,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210CS',name:'计算机程序设计（Python）实验',credits:0.5,hours:16,semester:6,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210GL',name:'Python数据分析与应用',credits:2,hours:32,semester:7,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210GS',name:'Python数据分析与应用实验',credits:0.5,hours:16,semester:7,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1144200AZ',name:'大学生职业发展与创业就业指导',credits:2,hours:40,semester:1,type:'required',platform:'general',module:'innovation',category:'必修'},
      {code:'4140800BL',name:'大学生心理健康教育',credits:2,hours:36,semester:1,type:'required',platform:'general',module:'health',category:'必修'},      {code:'1060110GL',name:'高等数学I',credits:3,hours:56,semester:1,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060100DL',name:'高等数学II',credits:3,hours:64,semester:2,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060200CL',name:'概率论与数理统计',credits:2,hours:40,semester:3,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'4060300DL',name:'线性代数',credits:2,hours:32,semester:3,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'2032710AL',name:'大学化学I',credits:2.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2032710AS',name:'大学化学实验I',credits:1.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2032710BL',name:'大学化学II',credits:3,hours:64,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2032710BS',name:'大学化学实验II',credits:1,hours:32,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022910CL',name:'会计学',credits:2,hours:40,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022910AS',name:'会计学实验',credits:0.5,hours:16,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4027710AL',name:'国际商务',credits:2.5,hours:48,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2021810BL',name:'管理学',credits:2.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4027810CL',name:'经济学',credits:4,hours:80,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2027310BL',name:'应用统计学',credits:1.5,hours:24,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2027310AS',name:'应用统计学实验',credits:0.5,hours:16,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4023010CL',name:'运筹学',credits:2,hours:32,semester:5,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022510CL',name:'经济法',credits:2,hours:32,semester:5,type:'required',platform:'foundation',module:'discipline',category:'必修'},      {code:'2021210BL',name:'药事管理学',credits:2,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4020800AL',name:'药物经济学',credits:2,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'1062110AL',name:'大学数学进阶',credits:2,hours:32,semester:4,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4020400AL',name:'博弈论',credits:2,hours:32,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2050110FL',name:'人体解剖生理学',credits:2,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2031210DL',name:'物理化学',credits:2.5,hours:48,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'3024210BL',name:'货币银行学',credits:2,hours:32,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4022410CL',name:'税收',credits:2,hours:32,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'3026310BL',name:'物流与供应链管理',credits:1.5,hours:24,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'1061110BL',name:'统计软件（基础）',credits:1,hours:16,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'1061110BS',name:'统计软件（基础）实验',credits:0.5,hours:16,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2040110CL',name:'生物化学',credits:2,hours:40,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4020500AL',name:'技术经济学',credits:2,hours:32,semester:8,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2029410AL',name:'创新管理',credits:1.5,hours:24,semester:8,type:'elective',platform:'foundation',module:'discipline',category:'选修'},      {code:'2024010BL',name:'市场营销学',credits:2.5,hours:48,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3026410BL',name:'医药市场营销实务',credits:2,hours:32,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3021000CL',name:'组织行为学',credits:1,hours:16,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3026510AL',name:'市场调查与预测',credits:1.5,hours:32,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4023710AL',name:'医药电子商务',credits:2,hours:32,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'1016210AL',name:'创业学',credits:2,hours:40,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4025810BL',name:'人力资源管理',credits:1,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4028510BL',name:'公司治理',credits:1,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4024100AL',name:'医药消费行为学',credits:2,hours:32,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4028610AS',name:'药店经营与诊断实训',credits:1,hours:32,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4022210CL',name:'战略管理',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3151010BL',name:'运营管理',credits:1,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3022310BL',name:'财务管理',credits:1.5,hours:24,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4026100AL',name:'计量经济学',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4026110AS',name:'计量经济学实验',credits:0.5,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3151710AS',name:'市场营销创新整合课程',credits:2.5,hours:80,semester:8,type:'required',platform:'professional',module:'integrate',category:'必修'},      {code:'3022600AL',name:'药店经营与管理',credits:2,hours:32,semester:7,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4028710AL',name:'服务营销',credits:2,hours:32,semester:7,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4028810AL',name:'价格理论与实务',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4023910BL',name:'医药商品学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3080510AL',name:'管理信息系统',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3026610AL',name:'计量营销学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3025000AL',name:'社会保障学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3024610AL',name:'国际市场营销学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4023410AL',name:'促销管理',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3026000AL',name:'质量管理',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3029610AL',name:'分销渠道管理',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3029710BL',name:'广告学与广告策划',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4023800AL',name:'药品经营质量管理',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4151510AL',name:'商务礼仪',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},      {code:'1140210BS',name:'军事技能训练',credits:1.5,hours:0,semester:1,type:'required',platform:'practice',module:'mil_train',category:'必修'},
      {code:'MK_PRACTICE_INT',name:'生产实习',credits:1,hours:0,semester:7,type:'required',platform:'practice',module:'internship',category:'必修'},
      {code:'MK_PRACTICE_TH',name:'毕业设计/毕业论文',credits:11,hours:0,semester:8,type:'required',platform:'practice',module:'thesis',category:'必修'},
      {code:'MK_PRACTICE_LB',name:'劳动',credits:2,hours:0,semester:0,type:'required',platform:'practice',module:'labor',category:'必修'},
      {code:'MK_2ND_CLASS',name:'第二课堂',credits:3,hours:0,semester:0,type:'elective',platform:'second_class_platform',module:'second_class',category:'选修'}
    ]
  },  'pharmacy_admin': {
    name: '药事管理（2023级）',
    code: '100704T',
    totalCredits: 152,
    requiredCredits: 112,
    electiveCredits: 40,
    degreeType: '理学学士',
    duration: 4,
    maxYears: 6,
    gpaDegree: 2.0,
    platforms: [
      {id:'general',name:'通识教育课程',required:44.5,elective:0,modules:[
        {id:'sizheng',name:'思政类',required:17,elective:1},
        {id:'foreign',name:'外语类',required:6,elective:3},
        {id:'military_pe',name:'军事体育类',required:5.5,elective:0},
        {id:'art',name:'艺术类',required:0,elective:1},
        {id:'humanities',name:'人文社科与医学基础类',required:2,elective:2},
        {id:'computer',name:'计算机与信息技术类',required:0,elective:3},
        {id:'innovation',name:'创新创业类',required:2,elective:0},
        {id:'health',name:'健康教育类',required:2,elective:0}
      ]},
      {id:'foundation',name:'大类及学科基础课程',required:44.5,elective:0,modules:[
        {id:'math',name:'数学类',required:7,elective:0},
        {id:'physics',name:'物理类',required:2.5,elective:0},
        {id:'discipline',name:'学科基础课程',required:27,elective:8}
      ]},
      {id:'professional',name:'专业课程',required:37.5,elective:0,modules:[
        {id:'prof_req',name:'专业必修',required:24.5,elective:0},
        {id:'prof_elec',name:'专业选修',required:0,elective:12},
        {id:'integrate',name:'整合课程',required:1,elective:0}
      ]},
      {id:'practice',name:'综合实践教学',required:15.5,elective:0,modules:[
        {id:'mil_train',name:'军事技能训练',required:1.5,elective:0},
        {id:'internship',name:'专业实习实训',required:1,elective:0},
        {id:'thesis',name:'毕业设计/毕业论文',required:11,elective:0},
        {id:'labor',name:'劳动',required:2,elective:0}
      ]},
      {id:'second_class_platform',name:'第二课堂',required:0,elective:3,modules:[
        {id:'second_class',name:'第二课堂',required:0,elective:3}
      ]},
      {id:'personal',name:'个性化培养课程',required:0,elective:7,modules:[
        {id:'free_elec',name:'个性化选修课程',required:0,elective:7}
      ]}
    ],    courses: [
      {code:'1010410CL',name:'思想道德与法治',credits:2.5,hours:40,semester:1,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS05',name:'思想政治理论实践课（思想道德与法治）',credits:0.5,hours:8,semester:1,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110BL',name:'马克思主义基本原理',credits:2.5,hours:40,semester:2,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS02',name:'思想政治理论实践课（马克思主义基本原理）',credits:0.5,hours:8,semester:2,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010210CL',name:'中国近现代史纲要',credits:2.5,hours:40,semester:3,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS03',name:'思想政治理论实践课（中国近现代史纲要）',credits:0.5,hours:8,semester:3,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010310DL',name:'毛泽东思想和中国特色社会主义理论体系概论',credits:2.5,hours:40,semester:4,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1010110AS04',name:'思想政治理论实践课（毛泽东思想和中国特色社会主义理论体系概论）',credits:0.5,hours:8,semester:4,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'5016410BL',name:'习近平新时代中国特色社会主义思想概论',credits:3,hours:48,semester:5,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1014200AL',name:'形势与政策',credits:2,hours:64,semester:0,type:'required',platform:'general',module:'sizheng',category:'必修'},
      {code:'1016310BL',name:'党史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1016310CL',name:'新中国史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1016310DL',name:'改革开放史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1016310EL',name:'社会主义发展史',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'sizheng',category:'选修'},
      {code:'1070110EZ',name:'大学英语I',credits:2.5,hours:48,semester:1,type:'required',platform:'general',module:'foreign',category:'必修'},
      {code:'1070100DZ',name:'大学英语II',credits:3.5,hours:64,semester:2,type:'required',platform:'general',module:'foreign',category:'必修'},
      {code:'1070110QL',name:'大学英语III',credits:1.5,hours:24,semester:3,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073210BL',name:'大学英语翻译与写作',credits:1.5,hours:24,semester:3,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1070120HL',name:'大学英语IV',credits:1.5,hours:24,semester:4,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1073310BL',name:'实用英语口语',credits:1.5,hours:24,semester:4,type:'elective',platform:'general',module:'foreign',category:'选修'},
      {code:'1130110BZ',name:'体育I',credits:1,hours:30,semester:1,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110DZ',name:'体育II',credits:1,hours:30,semester:2,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110EZ',name:'体育III',credits:1,hours:30,semester:3,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1130110FZ',name:'体育IV',credits:1,hours:30,semester:4,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'1140100AL',name:'军事理论',credits:1.5,hours:24,semester:1,type:'required',platform:'general',module:'military_pe',category:'必修'},
      {code:'4144500BL',name:'美术鉴赏',credits:0.5,hours:8,semester:1,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144400BL',name:'音乐鉴赏',credits:0.5,hours:8,semester:1,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144800BL',name:'书法鉴赏',credits:0.5,hours:8,semester:2,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4144700BL',name:'戏曲鉴赏',credits:0.5,hours:8,semester:2,type:'elective',platform:'general',module:'art',category:'选修'},
      {code:'4010600CL',name:'中华优秀传统文化',credits:1,hours:16,semester:2,type:'required',platform:'general',module:'humanities',category:'必修'},
      {code:'1073100BL',name:'应用写作',credits:1,hours:16,semester:2,type:'required',platform:'general',module:'humanities',category:'必修'},
      {code:'4012010AL',name:'演讲与口才',credits:1,hours:16,semester:3,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4012000AL',name:'社交礼仪',credits:1,hours:16,semester:3,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4011400AL',name:'医药伦理学',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4010910AL',name:'逻辑与思辨',credits:1,hours:16,semester:5,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4051100BL',name:'中医学基础',credits:1,hours:16,semester:5,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'4051000AL',name:'医学导论',credits:1,hours:16,semester:6,type:'elective',platform:'general',module:'humanities',category:'选修'},
      {code:'1080100BL',name:'大学计算机基础',credits:1,hours:16,semester:3,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080100BS',name:'大学计算机基础实验',credits:0.5,hours:16,semester:3,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'4082300AL',name:'Office高级应用',credits:1,hours:16,semester:4,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'4082300AS',name:'Office高级应用实验',credits:0.5,hours:16,semester:4,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080200EL',name:'计算机程序设计（Python）基础',credits:1,hours:16,semester:5,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210ES',name:'计算机程序设计（Python）基础实验',credits:0.5,hours:16,semester:5,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080200CL',name:'计算机程序设计（Python）',credits:2,hours:32,semester:6,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210CS',name:'计算机程序设计（Python）实验',credits:0.5,hours:16,semester:6,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210GL',name:'Python数据分析与应用',credits:2,hours:32,semester:7,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1080210GS',name:'Python数据分析与应用实验',credits:0.5,hours:16,semester:7,type:'elective',platform:'general',module:'computer',category:'选修'},
      {code:'1144200AZ',name:'大学生职业发展与创业就业指导',credits:2,hours:40,semester:1,type:'required',platform:'general',module:'innovation',category:'必修'},
      {code:'4140800BL',name:'大学生心理健康教育',credits:2,hours:36,semester:1,type:'required',platform:'general',module:'health',category:'必修'},      {code:'1060110GL',name:'高等数学I',credits:3,hours:56,semester:1,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060100EL',name:'高等数学II',credits:2,hours:40,semester:2,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060200CL',name:'概率论与数理统计',credits:2,hours:40,semester:3,type:'required',platform:'foundation',module:'math',category:'必修'},
      {code:'1060600EL',name:'物理学',credits:2,hours:40,semester:2,type:'required',platform:'foundation',module:'physics',category:'必修'},
      {code:'1060600CS',name:'物理学实验',credits:0.5,hours:16,semester:2,type:'required',platform:'foundation',module:'physics',category:'必修'},      {code:'2030110CL',name:'无机化学',credits:2.5,hours:48,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2030100BS',name:'无机化学实验',credits:1,hours:32,semester:1,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2090100AL',name:'药学概论',credits:2,hours:32,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2030400DL',name:'有机化学I',credits:2.5,hours:48,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2030400ES',name:'有机化学实验I',credits:1,hours:32,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2030410FL',name:'有机化学II',credits:1.5,hours:32,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2030410GS',name:'有机化学实验II',credits:1,hours:32,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'4027810DL',name:'经济学',credits:2.5,hours:48,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2021810CL',name:'管理学',credits:2,hours:32,semester:2,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2027500AL',name:'民法',credits:1,hours:16,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2050600AL',name:'临床医学概论',credits:2,hours:32,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2050110FL',name:'人体解剖生理学',credits:2,hours:32,semester:3,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'3021600AL',name:'行政法',credits:1.5,hours:24,semester:4,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2022510CL',name:'经济法',credits:2,hours:32,semester:5,type:'required',platform:'foundation',module:'discipline',category:'必修'},
      {code:'2021210DL',name:'药事管理学',credits:2.5,hours:48,semester:5,type:'required',platform:'foundation',module:'discipline',category:'必修'},      {code:'4028410AL',name:'药品电子监管',credits:1.5,hours:24,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4028410AS',name:'药品电子监管实验',credits:0.5,hours:16,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4060900BL',name:'人文物理学',credits:2,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2030110EL',name:'无机化学高阶',credits:1,hours:16,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2031010IL',name:'分析化学',credits:1.5,hours:32,semester:5,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4022410BL',name:'税收',credits:1,hours:16,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4060300DL',name:'线性代数',credits:2,hours:32,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2031210DL',name:'物理化学',credits:2.5,hours:48,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2027310BL',name:'应用统计学',credits:1.5,hours:24,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2027310AS',name:'应用统计学实验',credits:0.5,hours:16,semester:6,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'4025900BL',name:'生产运作管理',credits:2,hours:32,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'3021000CL',name:'组织行为学',credits:1,hours:16,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2040110CL',name:'生物化学',credits:2,hours:40,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'1083310BL',name:'商务数据分析与应用',credits:1,hours:16,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'1083310CS',name:'商务数据分析与应用实验',credits:0.5,hours:16,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'2024010BL',name:'市场营销学',credits:2.5,hours:48,semester:7,type:'elective',platform:'foundation',module:'discipline',category:'选修'},
      {code:'3026000AL',name:'质量管理',credits:2,hours:32,semester:8,type:'elective',platform:'foundation',module:'discipline',category:'选修'},      {code:'4021500AL',name:'药品知识产权',credits:2,hours:32,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4091510FL',name:'药物化学',credits:2,hours:40,semester:5,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4029010AL',name:'医药产品互联网经营与监管',credits:2,hours:32,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4029010AS',name:'医药产品互联网经营与监管实验',credits:0.5,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4023110CL',name:'药品质量管理规范',credits:1,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4091010HL',name:'药理学',credits:2,hours:40,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4028910AL',name:'医疗保障学',credits:1,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3021100AL',name:'中国药事法规',credits:1,hours:16,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3020910AL',name:'卫生经济学',credits:1.5,hours:24,semester:6,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4020800AL',name:'药物经济学',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3150210AL',name:'药物警戒与风险管理',credits:1,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3150110AL',name:'药品注册管理',credits:1,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4026100AL',name:'计量经济学',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4026110AS',name:'计量经济学实验',credits:0.5,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4090200CL',name:'药剂学',credits:2,hours:32,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4092300DL',name:'药物分析',credits:1.5,hours:24,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'4092310BS',name:'药物分析实验',credits:0.5,hours:16,semester:7,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3021300AL',name:'国际药事法规',credits:1,hours:16,semester:8,type:'required',platform:'professional',module:'prof_req',category:'必修'},
      {code:'3151310BS',name:'专业整合课程',credits:1,hours:32,semester:8,type:'required',platform:'professional',module:'integrate',category:'必修'},      {code:'3150510AL',name:'医疗机构药事管理',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4020400AL',name:'博弈论',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3025100AL',name:'行政管理学',credits:1.5,hours:24,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4141600AL',name:'医药经济信息检索',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'3025000AL',name:'社会保障学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4023010CL',name:'运筹学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'2027210BL',name:'医疗器械管理与法规',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4151410AL',name:'药学服务概论',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4023910BL',name:'医药商品学',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'1016210AL',name:'创业学',credits:2,hours:40,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4026210DL',name:'药品生产质量管理',credits:1.5,hours:24,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4150310AL',name:'药物临床试验管理',credits:1.5,hours:24,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4071700AL',name:'专业英语',credits:2,hours:32,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4151210AL',name:'中医药服务监督基础',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4014110BL',name:'公共政策学',credits:1.5,hours:24,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4094900CL',name:'生药学',credits:1.5,hours:24,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4025200AL',name:'社会调查方法',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4024900AL',name:'药物政策评价',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4151810AL',name:'药品监管科学',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},
      {code:'4051800AL',name:'药物流行病学',credits:1,hours:16,semester:8,type:'elective',platform:'professional',module:'prof_elec',category:'选修'},      {code:'1140210BS',name:'军事技能训练',credits:1.5,hours:0,semester:1,type:'required',platform:'practice',module:'mil_train',category:'必修'},
      {code:'PA_PRACTICE_INT',name:'生产实习',credits:1,hours:0,semester:7,type:'required',platform:'practice',module:'internship',category:'必修'},
      {code:'PA_PRACTICE_TH',name:'毕业设计/毕业论文',credits:11,hours:0,semester:8,type:'required',platform:'practice',module:'thesis',category:'必修'},
      {code:'PA_PRACTICE_LB',name:'劳动',credits:2,hours:0,semester:0,type:'required',platform:'practice',module:'labor',category:'必修'},
      {code:'PA_2ND_CLASS',name:'第二课堂',credits:3,hours:0,semester:0,type:'elective',platform:'second_class_platform',module:'second_class',category:'选修'}
    ]
  }
};
const MajorList = [
  {id:'business_admin',name:'工商管理（2023级）'},
  {id:'marketing',name:'市场营销（2023级）'},
  {id:'pharmacy_admin',name:'药事管理（2023级）'}
];


const StudentInfoData = [
  {studentId:'2305000105',name:'马一宁',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000107',name:'张涢馨',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000109',name:'曹亚萍',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000112',name:'牛玉晴',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000117',name:'李佳钰',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000119',name:'曹帅',gender:'男',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000122',name:'布威佐合热·艾则孜',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000124',name:'李秋茹',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000125',name:'曲千一',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000127',name:'何祎婧',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000201',name:'顾淼',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000205',name:'党鹏翔',gender:'男',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000210',name:'李卓恒',gender:'男',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000212',name:'孙艺元',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000213',name:'杨淑彤',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000215',name:'龚伊利',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000218',name:'何静怡',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000221',name:'李雨璐',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000222',name:'白杰',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000226',name:'刘书含',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000227',name:'徐安彤',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000228',name:'陈浴',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000229',name:'施贵花',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000230',name:'哈丽美热·艾赛',gender:'女',className:'工商管理班',major:'business_admin'},
  {studentId:'2305000231',name:'阿卜杜热合曼·图尔荪托合提',gender:'男',className:'工商管理班',major:'business_admin'},
  {studentId:'2205000123',name:'曹竞文',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000102',name:'徐嘉艺',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000103',name:'宋璇',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000104',name:'田语辰',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000106',name:'王一鸣',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000108',name:'罗子恒',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000110',name:'程慧如',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000111',name:'韩斯博',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000113',name:'胡博浩',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000114',name:'冼运演',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000118',name:'郑明浩',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000120',name:'谢姆斯耶·艾尔肯',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000121',name:'张慧',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000129',name:'谢智勇',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000130',name:'王莹莹',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000132',name:'阿尔娜·瓦力江',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000202',name:'马闯',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000203',name:'方鑫',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000204',name:'刘京京',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000206',name:'黄奕涵',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000214',name:'杨千慧',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000216',name:'张翰达',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000220',name:'王蒙恩',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000223',name:'唐煜博',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2305000224',name:'孔美婵',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000225',name:'张艺彤',gender:'女',className:'市场营销班',major:'marketing'},
  {studentId:'2305000232',name:'翁达森·吐尔迪别克',gender:'男',className:'市场营销班',major:'marketing'},
  {studentId:'2205010206',name:'贾曼斯',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010101',name:'董天琪',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010102',name:'马凡越',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010103',name:'刘星月',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010104',name:'许琳',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010105',name:'孙菁鸿',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010106',name:'肖宇琳',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010108',name:'马俊怡',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010109',name:'赵国超',gender:'男',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010110',name:'袁三雁',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010111',name:'刘念慈',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010112',name:'邱楚寒',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010113',name:'韩艾珈',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010115',name:'李俐萱',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010116',name:'阿迪力·米吉提',gender:'男',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010117',name:'赵思颖',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010118',name:'蒋宗耀',gender:'男',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010119',name:'李桐桐',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010120',name:'赵婧雯',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010121',name:'张馨悦',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010122',name:'窦明月',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010123',name:'戴若彤',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010124',name:'闵宇彤',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010125',name:'刘曼婷',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010126',name:'王智强',gender:'男',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010127',name:'张涛',gender:'男',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010128',name:'马成爽',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010129',name:'赵璐瑶',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010130',name:'佟嘉艺',gender:'男',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2305010131',name:'刘雨希',gender:'女',className:'药事管理一班',major:'pharmacy_admin'},
  {studentId:'2205010308',name:'王偲岑',gender:'男',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2205010418',name:'赵紫萱',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010201',name:'张诗琦',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010202',name:'王佳莹',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010203',name:'庄美泉',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010204',name:'刘雨晗',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010205',name:'吴佳南',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010206',name:'武博慧',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010207',name:'万蕊',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010208',name:'马雅欣',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010209',name:'江列星',gender:'男',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010210',name:'胡一楠',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010211',name:'安沛昂',gender:'男',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010212',name:'南子慧',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010213',name:'潘逸乐',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010214',name:'覃倩',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010215',name:'罗丽思',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010216',name:'刘宸睿',gender:'男',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010218',name:'杨悦',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010219',name:'李丽燕',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010220',name:'刘艺哲',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010221',name:'朱苗苗',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010222',name:'李昀桐',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010224',name:'李金蔓',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010225',name:'朱梓优',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010226',name:'王喆娴',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010227',name:'张永和',gender:'男',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010228',name:'鞠欣媛',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010229',name:'樊依霖',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010230',name:'戚婧婧',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2305010231',name:'穆耶赛尔罕·加拉力丁',gender:'女',className:'药事管理二班',major:'pharmacy_admin'},
  {studentId:'2105010232',name:'尼牙孜·阿不力米提',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2205010416',name:'刘玥萱',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010301',name:'邹依含',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010302',name:'于烁',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010303',name:'岳嘉睿',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010304',name:'王思梦',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010305',name:'郑雨桐',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010306',name:'孙烨',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010307',name:'范文馨',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010308',name:'于岩松',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010309',name:'李正丽',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010310',name:'章帆',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010311',name:'涂梓迎',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010312',name:'杨彤彤',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010313',name:'王昶懿',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010315',name:'丁翰妮',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010316',name:'盛文杰',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010317',name:'高明忞',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010318',name:'韦权原',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010319',name:'张美洁',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010320',name:'王茂霖',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010322',name:'胡峰维',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010323',name:'陈静涵',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010324',name:'申嘉仪',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010325',name:'李筱谡',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010326',name:'路晶晶',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010327',name:'梁雅淇',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010328',name:'张涛',gender:'男',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010329',name:'刘雅菲',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010330',name:'饶诗睿',gender:'女',className:'药事管理三班',major:'pharmacy_admin'},
  {studentId:'2305010401',name:'蒋滢',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010402',name:'许畅',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010403',name:'孙艺萌',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010404',name:'王秋阳',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010405',name:'付畅',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010406',name:'武千惠',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010407',name:'杨瞻阁',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010408',name:'张思齐',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010409',name:'王栩',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010410',name:'郭依蒙',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010411',name:'周杰',gender:'男',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010412',name:'郭怡远',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010413',name:'曹志军',gender:'男',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010414',name:'庞淑娅',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010415',name:'韦飞宏',gender:'男',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010416',name:'周雅丽',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010417',name:'韦国春',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010418',name:'范有钱',gender:'男',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010419',name:'林波儿',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010420',name:'宋文悦',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010421',name:'赵若涵',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010422',name:'林佳祎',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010423',name:'高尚',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010424',name:'吕晓妍',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010425',name:'杨会霖',gender:'男',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010426',name:'李禹潼',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010427',name:'李文斌',gender:'男',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010428',name:'张鹤子',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010429',name:'马倩',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2305010430',name:'布艾丽曼·阿卜杜许库',gender:'女',className:'药事管理四班',major:'pharmacy_admin'},
  {studentId:'2205010508',name:'叶凡溪',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010501',name:'王明远',gender:'男',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010502',name:'周晓曦',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010503',name:'董香萌',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010504',name:'李雪阳',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010505',name:'于文杰',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010506',name:'李慧媛',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010507',name:'倪子涵',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010508',name:'夏金玉',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010509',name:'刘雨欣',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010510',name:'谭信竹',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010511',name:'武诗怡',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010512',name:'秦雨',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010513',name:'柳晨东',gender:'男',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010514',name:'曾春梅',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010515',name:'张紫轩',gender:'男',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010516',name:'毕海雁',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010518',name:'刘蔓',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010519',name:'崔智杰',gender:'男',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010520',name:'李嘉欣',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010521',name:'桑润涵',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010522',name:'王文慧',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010523',name:'王慧娟',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010524',name:'李靖雯',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010525',name:'王禹程',gender:'男',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010526',name:'王姝忱',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010527',name:'王梓瑞',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010528',name:'张楚奇',gender:'男',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010530',name:'王思楠',gender:'女',className:'药事管理五班',major:'pharmacy_admin'},
  {studentId:'2305010601',name:'石瑞',gender:'男',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010602',name:'王新茹',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010603',name:'张轶驰',gender:'男',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010604',name:'刘宝涵',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010605',name:'侯雨佳',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010606',name:'张宇赫',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010607',name:'王明旭',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010608',name:'康竞文',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010609',name:'孙丽勤',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010610',name:'胡文浩',gender:'男',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010611',name:'李文慧',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010612',name:'董雨昕',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010613',name:'王嫣',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010614',name:'饶春花',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010615',name:'刘雨萱',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010616',name:'韩锦萱',gender:'男',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010617',name:'韩湘玥',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010618',name:'韩雨贤',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010619',name:'刘同旺',gender:'男',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010620',name:'李欣悦',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010621',name:'张静书',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010622',name:'张婧雪',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010623',name:'孙淼淼',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010624',name:'李婉宁',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010625',name:'李雨桐',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010626',name:'王可',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010627',name:'巨美懿',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010628',name:'张惠源',gender:'男',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010629',name:'刘欣蕊',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
  {studentId:'2305010630',name:'虞诗雨',gender:'女',className:'药事管理六班',major:'pharmacy_admin'},
];

const XuejiRules = {
  gpaCalc: {excellent:4,good:3,medium:2,pass:1},
  retention: {singleYear:4, crossYear:5},
  maxRetakes: 2,
  maxRetentionTotal: 2,
  degreeGpaMin: 2.0,
  peFailedNotCount: true,
  thesisFailedNotCount: true,
  attendanceThreshold: 0.75,
  absenteeismThreshold: 0.25,
  // ===== 毕业/学位条件（依据：59号规定、60号细则、校字〔2007〕10号学位授予办法） =====
  graduation: {
    totalCredits: 152,           // 修满总学分
    fitnessMinScore: 50,         // 体测总成绩 >= 50分（60号细则第9条：<50分按结业处理）
  },
  // ===== 结业条件（依据59号规定第54-56条、60号细则第9条） =====
  completion: {
    description: '达最长学习年限未完成学业、不申请延长学习或毕业年级达到留级条件',
    conditions: [
      {id:'fitness_fail', label:'体测总成绩<50分', desc:'60号细则第9条：体测总成绩达不到50分者按结业处理'},
      {id:'credits_partial', label:'修满一年以上但学分不足', desc:'修读满一学年以上且修读课程合格但未达毕业要求'},
    ],
    // 结业后可在最长学习年限内申请返校补修，补修合格后换发毕业证
    canConvertToGrad: true,
    convertWindow: '最长学习年限内（6年）',
  },
  // ===== 肄业条件（依据59号规定第58条） =====
  dropout: {
    description: '学满一学年以上退学的学生，发肄业证书',
    minYears: 1,
  },
  degree: {
    politicsOk: true,            // 政治品行合格
    graduated: true,             // 须先获得毕业资格
    requiredGpaMin: 1.80,         // 必修课和专业方向指定选修课平均学分绩 >= 1.80
    cet4MinScore: 350,           // CET-4 >= 350分
    cet4AltMinScore: 60,         // 或校英语学位考 >= 60分
    pePassRequired: true,         // 体育总评及格
  },
  noDegreeConditions: [
    '考试作弊受留校察看及以上处分且不符合弥补条件',
    '必修课和专业方向指定选修课平均学分绩 < 1.80',
    'CET-4 < 350分且校英语学位考 < 60分',
    '体育总评不及格',
    '结业生不授予学位'
  ]
};

const DEFAULT_STUDENT_PWD = '123456';

const DB = {
  _prefix() { const u = localStorage.getItem('gc_current_user'); return u ? 'gc_' + u + '_' : 'gc_'; },

  // ===== 用户管理 =====
  getUsers() { return SyncAPI.getItem('gc_users', []); },
  saveUsers(users) { SyncAPI.setItem('gc_users', users); },
  getCurrentUser() {
    const id = localStorage.getItem('gc_current_user');
    if (!id) return null;
    return this.getUsers().find(u => u.id === id) || null;
  },

  login(username, password) {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return false;
    localStorage.setItem('gc_current_user', user.id);
    return user;
  },
  logout() { localStorage.removeItem('gc_current_user'); },

  // ===== 初始化：导入管理员和学生 =====
  init() {
    const users = this.getUsers();
    if (users.length > 0) return; // 已初始化

    // 两个管理员
    users.push(
      {id:'admin_counselor', username:'黎佳茵教师', password:'Ljy15042670649', role:'counselor', displayName:'黎佳茵教师', studentId:'', name:'黎佳茵教师', className:'', major:''},
      {id:'admin_cadre', username:'90qdgb123456', password:'90qdgb123456', role:'cadre', displayName:'期队干部', studentId:'', name:'期队干部', className:'', major:''},
      {id:'admin_qiduzhang', username:'Cs20041026@@', password:'Cs20041026@@', role:'cadre', displayName:'伟大的期队长', studentId:'', name:'伟大的期队长', className:'', major:''}
    );

    // 导入学生（从StudentInfoData）
    for (const s of StudentInfoData) {
      users.push({
        id: 'stu_' + s.studentId,
        studentId: s.studentId,
        username: s.studentId,
        name: s.name,
        password: DEFAULT_STUDENT_PWD,
        gender: s.gender,
        major: s.major,
        className: s.className,
        role: 'student',
        displayName: s.name,
        createdAt: new Date().toISOString()
      });
    }
    this.saveUsers(users);
  },

  // ===== 管理员功能：获取所有学生列表 =====
  getAllStudents() {
    return this.getUsers().filter(u => u.role === 'student');
  },
  getStudentBySid(sid) {
    return this.getUsers().find(u => u.studentId === sid && u.role === 'student');
  },

  // ===== 管理员功能：导入/管理学生成绩 =====
  getGradesByUser(userId) {
    return SyncAPI.getItem('gc_' + userId + '_grades', []);
  },
  saveGradesByUser(userId, grades) {
    SyncAPI.setItem('gc_' + userId + '_grades', grades);
  },
  // 学生自己的成绩（兼容旧接口）
  getGrades() { return this.getGradesByUser(localStorage.getItem('gc_current_user')); },
  saveGrades(grades) { this.saveGradesByUser(localStorage.getItem('gc_current_user'), grades); },
  addGrade(userIdOrGrade, gradeData) {
    // 支持两种调用：addGrade(userId, gradeData) 或 addGrade(gradeData) 
    let userId, grade;
    if (gradeData) {
      userId = userIdOrGrade;
      grade = gradeData;
    } else {
      userId = localStorage.getItem('gc_current_user');
      grade = userIdOrGrade;
    }
    const grades = this.getGradesByUser(userId);
    const existing = grades.findIndex(g => (g.courseId === grade.courseId || g.code === grade.code) && g.semester === grade.semester);
    if (existing >= 0) { grades[existing] = grade; } else { grades.push(grade); }
    this.saveGradesByUser(userId, grades);
    return grades;
  },
  deleteGrade(code, semester) {
    const userId = localStorage.getItem('gc_current_user');
    let grades = this.getGradesByUser(userId);
    grades = grades.filter(g => !(g.code === code && g.semester === semester));
    this.saveGradesByUser(userId, grades);
    return grades;
  },
  // 管理员为学生添加成绩
  addGradeForStudent(studentId, grade) {
    const student = this.getStudentBySid(studentId);
    if (!student) return;
    const grades = this.getGradesByUser(student.id);
    const existing = grades.findIndex(g => g.code === grade.code && g.semester === grade.semester);
    if (existing >= 0) { grades[existing] = grade; } else { grades.push(grade); }
    this.saveGradesByUser(student.id, grades);
  },
  importGradesForStudent(studentId, gradeList) {
    const student = this.getStudentBySid(studentId);
    if (!student) return;
    const grades = this.getGradesByUser(student.id);
    for (const g of gradeList) {
      const idx = grades.findIndex(e => e.code === g.code && e.semester === g.semester);
      if (idx >= 0) { grades[idx] = g; } else { grades.push(g); }
    }
    this.saveGradesByUser(student.id, grades);
  },

  // ===== GPA计算 =====
  calcGPA(grades) {
    let totalPoints = 0, totalCredits = 0;
    for (const g of grades) {
      if (!g.score || g.score < 60 || !g.credits) continue;
      const point = g.score >= 90 ? 4 : g.score >= 80 ? 3 : g.score >= 70 ? 2 : 1;
      totalPoints += point * g.credits;
      totalCredits += g.credits;
    }
    return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  },
  calcRequiredGPA(grades, majorInfo) {
    if (!majorInfo) return 0;
    const reqCodes = new Set();
    for (const c of (majorInfo.courses||[])) { if (c.category === '必修') reqCodes.add(c.code); }
    let totalPoints = 0, totalCredits = 0;
    for (const g of grades) {
      if (!g.score || !g.credits || !reqCodes.has(g.code) || g.score < 60) continue;
      const point = g.score >= 90 ? 4 : g.score >= 80 ? 3 : g.score >= 70 ? 2 : 1;
      totalPoints += point * g.credits;
      totalCredits += g.credits;
    }
    return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  },
  calcGPABySemester(grades) {
    const semMap = {};
    for (const g of grades) {
      if (!g.score || g.score < 60 || !g.credits) continue;
      const sem = g.semester || 'unknown';
      if (!semMap[sem]) semMap[sem] = {points:0, credits:0};
      const point = g.score >= 90 ? 4 : g.score >= 80 ? 3 : g.score >= 70 ? 2 : 1;
      semMap[sem].points += point * g.credits;
      semMap[sem].credits += g.credits;
    }
    const result = [];
    for (const [sem, d] of Object.entries(semMap)) {
      result.push({semester: sem, gpa: d.credits > 0 ? (d.points / d.credits) : 0, credits: d.credits});
    }
    return result.sort((a,b) => a.semester - b.semester);
  },

  // ===== 附加信息：CET-4/体测等 =====
  getExtraInfo(userId) {
    const uid = userId || localStorage.getItem('gc_current_user');
    if (!uid) return null;
    const data = SyncAPI.getItem('gc_' + uid + '_extra', {});
    const user = this.getUsers().find(u => u.id === uid);
    return {
      cet4Passed: data.cet4Passed === true,
      cet4Score: data.cet4Score || 0,
      schoolEngScore: data.schoolEngScore || 0,
      fitnessScores: data.fitnessScores || [],
      fitnessTotal: data.fitnessTotal || 0,
      pePassed: data.pePassed === true,
    };
  },
  saveExtraInfo(info, userId) {
    const uid = userId || localStorage.getItem('gc_current_user');
    if (!uid) return;
    SyncAPI.setItem('gc_' + uid + '_extra', info);
  },

  // ===== 文件管理 =====
  getFiles() { return SyncAPI.getItem('gc_files', []); },
  saveFiles(files) { SyncAPI.setItem('gc_files', files); },
  addFile(fileData) {
    const files = this.getFiles();
    files.unshift({id: 'f_' + Date.now(), ...fileData, uploadTime: new Date().toISOString()});
    this.saveFiles(files);
    return files;
  },
  deleteFile(fileId) {
    let files = this.getFiles();
    files = files.filter(f => f.id !== fileId);
    this.saveFiles(files);
    return files;
  },

  // ===== 通知管理 =====
  getNotices() { return SyncAPI.getItem('gc_notices', []); },
  saveNotices(notices) { SyncAPI.setItem('gc_notices', notices); },
  addNotice(noticeData) {
    const notices = this.getNotices();
    notices.unshift({id: 'n_' + Date.now(), ...noticeData, publishTime: new Date().toISOString()});
    this.saveNotices(notices);
    return notices;
  },
  deleteNotice(noticeId) {
    let notices = this.getNotices();
    notices = notices.filter(n => n.id !== noticeId);
    this.saveNotices(notices);
    return notices;
  },

  // ===== 学生自编辑成绩方法 =====
  addGradeForCurrentUser(gradeData) {
    const userId = localStorage.getItem('gc_current_user');
    if (!userId) return;
    const grades = this.getGradesByUser(userId);
    const existing = grades.findIndex(g => (g.courseId === gradeData.courseId || g.code === gradeData.code) && g.semester === gradeData.semester);
    if (existing >= 0) { grades[existing] = gradeData; } else { grades.push(gradeData); }
    this.saveGradesByUser(userId, grades);
    return grades;
  },
  updateGrade(gradeData) {
    const userId = localStorage.getItem('gc_current_user');
    if (!userId) return;
    const grades = this.getGradesByUser(userId);
    const idx = grades.findIndex(g => (g.courseId === gradeData.courseId || g.code === gradeData.code) && g.semester === gradeData.semester);
    if (idx >= 0) { grades[idx] = gradeData; this.saveGradesByUser(userId, grades); }
    return grades;
  },
  deleteGradeForStudent(userId, code, semester) {
    let grades = this.getGradesByUser(userId);
    grades = grades.filter(g => !(g.code === code && g.semester === semester));
    this.saveGradesByUser(userId, grades);
    return grades;
  },

  // ===== 管理员功能 =====
  resetPassword(userId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) { user.password = '123456'; this.saveUsers(users); }
  },
  deleteStudent(userId) {
    let users = this.getUsers();
    users = users.filter(u => u.id !== userId);
    this.saveUsers(users);
    SyncAPI.removeItem('gc_' + userId + '_grades');
    SyncAPI.removeItem('gc_' + userId + '_extra');
  },

  // ===== 兼容方法（供app.js组件使用） =====
  getStudents() { return this.getAllStudents(); },

  getCourseList() {
    if (!window.CourseDataMap) {
      window.CourseDataMap = {};
      for (const [majorId, majorInfo] of Object.entries(MajorData)) {
        window.CourseDataMap[majorId] = majorInfo.courses || [];
      }
    }

    const courses = [];
    const majors = ['business_admin', 'marketing', 'pharmacy_admin'];
    for (const major of majors) {
      const data = CourseDataMap[major];
      if (data && data.length) {
        data.forEach(c => {
          if (!courses.find(x => x.id === c.code)) {
            courses.push({id: c.code, name: c.name, credit: c.credits||c.credit, required: c.type === 'required' || c.category === '必修', type: c.type, semester: c.semester, platform: c.platform, module: c.module});
          }
        });
      }
    }
    return courses;
  },

  getXuejiStatus(userId) {
    const user = this.getUsers().find(u => u.id === userId);
    if (!user || user.role !== 'student') return '未知';
    const grades = this.getGradesByUser(userId);
    const totalCredits = grades.reduce((s, g) => s + (g.credit || 0), 0);
    const extra = this.getExtraInfo(userId);

    // 肄业条件：学满1年以上但不到毕业/结业条件
    if (grades.length > 0 && totalCredits > 20) {
      // 检查是否满足结业条件
      const major = user.major;
      const rules = XuejiRules[major] || XuejiRules.business_admin;
      const requiredRules = rules.graduation.filter(r => r.required);
      const metCount = requiredRules.filter(r => totalCredits >= r.minCredits).length;

      if (totalCredits < (rules.graduation.find(r => r.key === 'total')?.minCredits || 160) * 0.5) {
        return '肄业';
      }
    }

    // 结业条件检查
    if (totalCredits >= 100) {
      const major = user.major;
      const rules = XuejiRules[major] || XuejiRules.business_admin;
      const totalReq = rules.graduation.find(r => r.key === 'total')?.minCredits || 160;

      // 学分接近但未满
      if (totalCredits < totalReq) {
        return '结业';
      }

      // 检查体测（60号细则：体测<50按结业处理）
      if (extra.tiCeScore !== undefined && extra.tiCeScore !== null && extra.tiCeScore < 50) {
        return '结业';
      }

      return '毕业';
    }

    return '在读';
  },
};

// 异步初始化：先本地立即初始化 DB，再异步连接 Supabase 云端
DB.init();
// 强制密码同步
(function(){
  var SYNC_PWD = {'2305000119':'cs20041026'};
  var users = DB.getUsers();
  var changed = false;
  for(var sid in SYNC_PWD){
    var u = users.find(function(x){return x.studentId===sid});
    if(u){ u.password=SYNC_PWD[sid]; changed=true; }
  }
  if(changed) DB.saveUsers(users);
})();
// 强制成绩同步（立即写入 localStorage）
(function(){
  if(typeof SYNC_GRADES_DATA !== 'undefined' && SYNC_GRADES_DATA && SYNC_GRADES_DATA.length > 0){
    var userId = 'stu_2305000119';
    var key = 'gc_' + userId + '_grades';
    SyncAPI.setItem(key, SYNC_GRADES_DATA);
    console.log('[SYNC] 成绩数据已写入本地: ' + SYNC_GRADES_DATA.length + '门');
  }
})();
// 异步连接 Supabase 云端并同步数据
(async function(){
  try {
    await SyncAPI.init();
    console.log('[DB] SyncAPI 初始化完成，模式:', SyncAPI.getMode());
    if(SyncAPI.isServerAvailable()){
      await SyncAPI.syncFromServer();
      console.log('[DB] 数据同步完成');
    }
  } catch(e){
    console.warn('[DB] SyncAPI 初始化失败:', e.message);
  }
})();
