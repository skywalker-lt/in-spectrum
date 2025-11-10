const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('server.js is loading…');

app.use(cors());
app.use(express.json());

const chapters = [
  {
    id: 'chapter1',
    title: '第一章：青春期的规则迷宫 · 扮演体育老师王老师',
    role: '体育老师王老师',
    intro: [
      '王老师： 陈明！怎么不跟同学们一起去玩啊？',
      '陈明： （身体微微一僵，视线停留在王老师的领口，避免眼神接触）……集体活动规则手册第3条：在非强制参与时间内，个体有权选择独处。'
    ],
    options: [
      {
        id: 'ch1o1',
        text: '【大笑拍拍他】“哈哈，什么规则手册！你这孩子真逗，走，去打篮球！”',
        outcome: {
          success: false,
          lines: [
            '（你的手拍到陈明肩膀的瞬间，他猛地后退，捂住耳朵，声音变得平板而急促）',
            '陈明： 警告！未授权的身体接触。社交脚本未载明此情况应对流程。请求终止互动！',
            '王老师： 我只是想跟你开个玩笑……',
            '陈明： （打断）玩笑。定义：为引人发笑而说的言语或做的动作。逻辑分析失败。未检测到笑点。你的言语（“真逗”）与行动（拍打）不匹配。无法理解。'
          ],
          systemNote: '系统提示：陈明进入防御状态。他无法处理非字面意义的语言和突发肢体接触。'
        }
      },
      {
        id: 'ch1o2',
        text: '【皱眉】“你这是什么奇怪的说法？我是老师，我让你去就去。”',
        outcome: {
          success: false,
          lines: [
            '（你的手拍到陈明肩膀的瞬间，他猛地后退，捂住耳朵，声音变得平板而急促）',
            '陈明： 警告！未授权的身体接触。社交脚本未载明此情况应对流程。请求终止互动！',
            '王老师： 我只是想跟你开个玩笑……',
            '陈明： （打断）玩笑。定义：为引人发笑而说的言语或做的动作。逻辑分析失败。未检测到笑点。你的言语（“真逗”）与行动（拍打）不匹配。无法理解。'
          ],
          systemNote: '系统提示：陈明进入防御状态。他无法处理非字面意义的语言和突发肢体接触。'
        }
      },
      {
        id: 'ch1o3',
        text: '【愣住，尝试理解】“规则手册？你……是在引用什么东西吗？”',
        outcome: {
          success: true,
          lines: [
            '王老师： 规则手册？你……是在引用什么东西吗？',
            '陈明： （语速稍缓）是我编写的《校园社交生存指南》。基于观察。第7条：当被询问“为什么不一起玩”时，标准回答A是“我有点累”，回答B是“我等一下再去”。我刚刚……选择了更符合事实的回答C，看来是错误的。',
            '王老师： （震惊）你……需要靠手册来对话？',
            '陈明： 是的。不然无法理解。比如，为什么同学A会对同学B说“你真讨厌”，但两人都在笑？为什么他们说“下次一起玩”但从未执行？这些都需要记录和分析。'
          ],
          systemNote: null
        }
      }
    ],
    reflection: [
      '王老师（内心独白）： 他不是在抗拒社交，他是在用一套严密的科学方法，去攻克我们觉得理所当然的难题。'
    ]
  },
  {
    id: 'chapter2',
    title: '第二章：成年人的面具职场 · 扮演上司李经理',
    role: '上司李经理',
    intro: [
      '李经理： 陈明，这个新项目的数据，你下周三前给我个初步结果，没问题吧？',
      '陈明： （直视电脑屏幕，而非你的眼睛）“下周三前”是一个不精确的描述。是指3月6日17:00下班前，还是24:00前？另外，“初步结果”需要明确定义。是数据清洗后的原始集，还是包含基础分析的报告？请提供精确参数。'
    ],
    options: [
      {
        id: 'ch2o1',
        text: '【不耐烦】“就下班前给我看看！大概弄一下就行，不用这么死板。”',
        outcome: {
          success: false,
          lines: [
            '陈明： （表情困惑且焦虑）“大概弄一下”是违反数据处理原则的。“灵活”是一个无法量化的指令。我无法执行。李经理，你的指令充满了无法解析的“社交噪音”，这会导致我的工作进程阻塞。',
            '李经理： 你怎么就这么轴呢？',
            '陈明： “轴”……是指我像轮轴一样固定吗？这是一种批评吗？请问我具体需要修正哪一部分行为？'
          ],
          systemNote: '系统提示：陈明无法理解非精确指令和比喻，他需要字面意义上的、逻辑清晰的沟通。'
        }
      },
      {
        id: 'ch2o2',
        text: '【开玩笑】“哎呀，你别跟个机器人似的，灵活点！”',
        outcome: {
          success: false,
          lines: [
            '陈明： （表情困惑且焦虑）“大概弄一下”是违反数据处理原则的。“灵活”是一个无法量化的指令。我无法执行。李经理，你的指令充满了无法解析的“社交噪音”，这会导致我的工作进程阻塞。',
            '李经理： 你怎么就这么轴呢？',
            '陈明： “轴”……是指我像轮轴一样固定吗？这是一种批评吗？请问我具体需要修正哪一部分行为？'
          ],
          systemNote: '系统提示：陈明无法理解非精确指令和比喻，他需要字面意义上的、逻辑清晰的沟通。'
        }
      },
      {
        id: 'ch2o3',
        text: '【给出精确指示】“好的，是我没说清。我需要你在3月6日17:00前，提交一份包含数据清洗步骤和描述性统计（均值、方差）的PDF报告。”',
        outcome: {
          success: true,
          lines: [
            '陈明： （立刻在电脑上记录）指令已确认。任务：数据分析报告。格式：PDF。内容：数据清洗步骤，描述性统计。截止时间：3月6日17:00。收到。可以执行。',
            '李经理： （尝试拉近距离）好。对了，看你中午总一个人吃饭，下次可以跟我们一起去食堂啊。',
            '陈明： （程序化地回答）根据《职场社交优化协议》，每周三中午是与同事进行非必要社交的预设时间。但目前该时段已安排用于深度学习算法更新。申请豁免。'
          ],
          systemNote: null
        }
      }
    ],
    reflection: [
      '李经理（内心独白）： 他把社交都写进了“协议”里进行管理。对我们而言是放松的闲聊，对他而言是需要规划和消耗能量的“任务”。'
    ]
  },
  {
    id: 'chapter3',
    title: '第三章：老年的秩序与和解 · 扮演社工小张',
    role: '社工小张',
    intro: [
      '小张： 陈伯伯，我带了新的点心来，您尝尝吗？可好吃了！',
      '陈明： （看了一眼你手中包装鲜艳的点心，视线迅速移开）谢谢。但现在是“茉莉花茶与苏打饼干”时间。新食物不在计划内。它的感官属性（颜色、质地、气味）未知，存在风险。'
    ],
    options: [
      {
        id: 'ch3o1',
        text: '【热情推荐】“就尝一小口嘛！人生要勇于尝试新事物！”',
        outcome: {
          success: false,
          lines: [
            '陈明： （身体微微后倾）“勇于尝试”是情感驱动型建议，缺乏风险评估逻辑。“可惜”是对我饮食计划的负面评价。我的饮食计划是为了保证营养摄入稳定和感官舒适，并非因为“腻”或“不腻”。你的逻辑无法成立。'
          ],
          systemNote: '系统提示：陈明感知到了情感压迫和评判，启动了逻辑防御。'
        }
      },
      {
        id: 'ch3o2',
        text: '【表示同情】“您每天都吃一样的，不觉得腻吗？多可惜啊。”',
        outcome: {
          success: false,
          lines: [
            '陈明： （身体微微后倾）“勇于尝试”是情感驱动型建议，缺乏风险评估逻辑。“可惜”是对我饮食计划的负面评价。我的饮食计划是为了保证营养摄入稳定和感官舒适，并非因为“腻”或“不腻”。你的逻辑无法成立。'
          ],
          systemNote: '系统提示：陈明感知到了情感压迫和评判，启动了逻辑防御。'
        }
      },
      {
        id: 'ch3o3',
        text: '【尊重并描述】“我理解。这是一款抹茶酥，外表是绿色的，口感是酥脆的，内部有柔软的豆沙馅，味道是微甜带一点茶香。”',
        outcome: {
          success: true,
          lines: [
            '小张： “……味道是微甜带一点茶香。”',
            '陈明： （沉默了几秒，似乎在处理信息）抹茶……是绿茶粉末。酥脆……和饼干类似。豆沙馅……是已知的安全食材。微甜……在可接受范围内。',
            '陈明： 信息已记录。将于下周“新食物体验日”进行评估。谢谢你的……数据提供。',
            '小张： （微笑）不客气，陈伯伯。',
            '（一阵沉默。小张不再试图没话找话，只是安静地坐着。几分钟后）',
            '陈明： （突然开口，依然不看她）张社工。你今天……没有说“天气真好”或者“最近有什么新闻吗”这类开启冗余对话的短语。',
            '小张： 嗯，我觉得这样安静地坐着也挺好的。',
            '陈明： （极其轻微地，几乎不可见地点了一下头）……是的。这样很好。效率很高。'
          ],
          systemNote: null
        }
      }
    ],
    reflection: [
      '小张（内心独白）： 我一直在用“社交”轰炸他，却忘了，安静的陪伴本身也是一种更深层的交流。我终于学会了，在他世界的频率上，与他对话。'
    ]
  }
];

function getChapterById(id) {
  return chapters.find((chapter) => chapter.id === id);
}

function getNextChapterId(currentId) {
  const currentIndex = chapters.findIndex((chapter) => chapter.id === currentId);
  if (currentIndex === -1 || currentIndex === chapters.length - 1) {
    return null;
  }
  return chapters[currentIndex + 1].id;
}

app.get('/api/chapters/:id', (req, res) => {
  const { id } = req.params;
  const chapter = getChapterById(id);

  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found.' });
  }

  const payload = {
    id: chapter.id,
    title: chapter.title,
    role: chapter.role,
    intro: chapter.intro,
    options: chapter.options.map((option) => ({
      id: option.id,
      text: option.text
    }))
  };

  return res.json(payload);
});

app.post('/api/chapters/:id/choose', (req, res) => {
  const { id } = req.params;
  const { optionId } = req.body;

  if (!optionId) {
    return res.status(400).json({ error: 'optionId is required.' });
  }

  const chapter = getChapterById(id);

  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found.' });
  }

  const option = chapter.options.find((item) => item.id === optionId);

  if (!option) {
    return res.status(404).json({ error: 'Option not found.' });
  }

  const outcome = option.outcome;
  const nextChapterId = outcome.success ? getNextChapterId(chapter.id) : null;

  return res.json({
    success: outcome.success,
    lines: outcome.lines,
    systemNote: outcome.systemNote || null,
    reflection: outcome.success ? chapter.reflection : null,
    nextChapterId
  });
});

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
console.log('HTTP server created. Initial server.listening =', server.listening);

server.listen(PORT, () => {
  console.log(`Dialogue game server is running at http://localhost:${PORT}`);
  console.log('server.listen callback fired. Current server.listening =', server.listening);
});

server.on('error', (err) => {
  console.error('HTTP server emitted an error:', err);
});

server.on('close', () => {
  console.log('HTTP server closed.');
});

process.on('exit', (code) => {
  console.log('Process exit event. Exit code =', code);
});