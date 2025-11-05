// Story Data Structure
const STORY_DATA = {
    // Chapter 1: 시골 (3 nodes)
    chapter1_start: {
        id: 'chapter1_start',
        chapter: 1,
        background: 'countryside',
        character: 'countrysideNeutral',
        bgm: 'mainTheme',
        text: '평화로운 시골 마을. 찌익이는 오늘도 들판을 뛰어다니며 행복한 하루를 보내고 있었습니다.\n\n"이곳에서의 삶은 정말 평온해... 하지만 가끔은 새로운 것을 경험해보고 싶기도 해."',
        choices: [
            {
                text: '오늘도 들판을 뛰어다니며 놀자',
                effect: { hp: 10, sp: -5 },
                nextNode: 'chapter1_peaceful'
            },
            {
                text: '마을 어른들께 서울 이야기를 들어보자',
                effect: { hp: -5, sp: 10 },
                nextNode: 'chapter1_curious'
            }
        ]
    },

    chapter1_peaceful: {
        id: 'chapter1_peaceful',
        chapter: 1,
        background: 'countryside',
        character: 'countrysideNeutral',
        bgm: 'mainTheme',
        text: '따뜻한 햇살 아래에서 친구들과 뛰어놀았습니다. 단순하지만 행복한 하루였습니다.\n\n그날 저녁, 서울에서 온 편지가 도착했습니다.',
        choices: [
            {
                text: '편지를 읽어본다',
                effect: { hp: 0, sp: 5 },
                nextNode: 'chapter1_letter'
            }
        ]
    },

    chapter1_curious: {
        id: 'chapter1_curious',
        chapter: 1,
        background: 'countryside',
        character: 'countrysideNeutral',
        bgm: 'mainTheme',
        text: '어른들은 서울의 화려한 삶에 대해 이야기해주셨습니다.\n\n"서울에는 맛있는 음식도 많고, 볼거리도 많단다. 하지만 그만큼 위험도 많지..."\n\n그날 저녁, 서울에서 온 편지가 도착했습니다.',
        choices: [
            {
                text: '편지를 읽어본다',
                effect: { hp: 0, sp: 5 },
                nextNode: 'chapter1_letter'
            }
        ]
    },

    chapter1_letter: {
        id: 'chapter1_letter',
        chapter: 1,
        background: 'countryside',
        character: 'countrysideWorried',
        bgm: 'mainTheme',
        text: '"친애하는 친구에게,\n\n서울에 와봐! 여기는 정말 멋진 곳이야. 맛있는 음식도 많고, 재미있는 일도 많아. 너도 분명 좋아할 거야!"\n\n서울쥐의 편지를 읽고 찌익이는 고민에 빠졌습니다.',
        choices: [
            {
                text: '서울로 떠나기로 결심한다',
                effect: { hp: -10, sp: 15 },
                nextNode: 'chapter2_arrival',
                sfx: 'choice'
            },
            {
                text: '시골에 머무르기로 한다',
                effect: { hp: 15, sp: -10 },
                nextNode: 'ending_a',
                sfx: 'choice'
            }
        ]
    },

    // Chapter 2: 서울 도착 (4 nodes)
    chapter2_arrival: {
        id: 'chapter2_arrival',
        chapter: 2,
        background: 'seoulCity',
        character: 'seoulNeutral',
        bgm: 'mainTheme',
        ambient: 'ambientCity',
        text: '서울에 도착한 찌익이. 높은 빌딩과 밝은 네온사인, 시끌벅적한 거리에 압도당했습니다.\n\n서울쥐가 반갑게 맞이해줍니다.\n\n"잘 왔어! 내가 서울의 모든 것을 보여줄게!"',
        choices: [
            {
                text: '흥분된 마음으로 따라간다',
                effect: { hp: -5, sp: 10 },
                nextNode: 'chapter2_explore'
            },
            {
                text: '조심스럽게 주변을 살핀다',
                effect: { hp: 5, sp: 5 },
                nextNode: 'chapter2_careful'
            }
        ]
    },

    chapter2_explore: {
        id: 'chapter2_explore',
        chapter: 2,
        background: 'seoulCity',
        character: 'seoulNeutral',
        bgm: 'mainTheme',
        ambient: 'ambientCity',
        text: '서울쥐는 찌익이를 화려한 레스토랑으로 데려갔습니다.\n\n"여기 음식들 좀 봐! 시골에서는 상상도 못했던 맛이야!"\n\n테이블 위에는 온갖 진미가 가득했습니다.',
        choices: [
            {
                text: '마음껏 먹는다',
                effect: { hp: -10, sp: 15 },
                nextNode: 'chapter2_feast',
                sfx: 'success'
            },
            {
                text: '조금만 맛본다',
                effect: { hp: 5, sp: 5 },
                nextNode: 'chapter2_modest',
                sfx: 'success'
            }
        ]
    },

    chapter2_careful: {
        id: 'chapter2_careful',
        chapter: 2,
        background: 'seoulCity',
        character: 'countrysideWorried',
        bgm: 'mainTheme',
        ambient: 'ambientCity',
        text: '찌익이는 신중하게 서울의 거리를 관찰했습니다.\n\n화려함 뒤에 숨겨진 위험들이 보였습니다. 빠르게 달리는 자동차, 무심히 지나가는 사람들...\n\n"여기는 시골과 정말 다르네..."',
        choices: [
            {
                text: '서울쥐에게 걱정을 털어놓는다',
                effect: { hp: 5, sp: 10 },
                nextNode: 'chapter2_talk'
            },
            {
                text: '혼자 적응하려고 노력한다',
                effect: { hp: -5, sp: 15 },
                nextNode: 'chapter2_adapt'
            }
        ]
    },

    chapter2_feast: {
        id: 'chapter2_feast',
        chapter: 2,
        background: 'seoulCity',
        character: 'seoulNeutral',
        bgm: 'mainTheme',
        text: '맛있는 음식에 빠져 시간 가는 줄 몰랐습니다.\n\n갑자기 큰 소리가 들렸습니다. 레스토랑 주인이 들어오고 있었습니다!',
        choices: [
            {
                text: '서울쥐를 따라 빠르게 도망친다',
                effect: { hp: -15, sp: 10 },
                nextNode: 'chapter3_danger',
                sfx: 'warning'
            }
        ]
    },

    chapter2_modest: {
        id: 'chapter2_modest',
        chapter: 2,
        background: 'seoulCity',
        character: 'countrysideNeutral',
        bgm: 'mainTheme',
        text: '적당히 먹고 주변을 경계했던 것이 다행이었습니다.\n\n소리를 듣고 재빨리 피할 수 있었습니다.\n\n"여기서는 항상 조심해야 해..." 서울쥐가 말했습니다.',
        choices: [
            {
                text: '다음 장소로 이동한다',
                effect: { hp: 0, sp: 5 },
                nextNode: 'chapter3_crisis',
                sfx: 'pageTurn'
            }
        ]
    },

    chapter2_talk: {
        id: 'chapter2_talk',
        chapter: 2,
        background: 'seoulCity',
        character: 'seoulSerious',
        bgm: 'mainTheme',
        text: '서울쥐는 찌익이의 걱정을 이해하는 듯했습니다.\n\n"처음엔 다들 그래. 하지만 익숙해지면 서울의 매력을 알게 될 거야. 조심하면서 즐기면 돼."',
        choices: [
            {
                text: '조언에 감사하며 계속 둘러본다',
                effect: { hp: 5, sp: 10 },
                nextNode: 'chapter3_crisis',
                sfx: 'pageTurn'
            }
        ]
    },

    chapter2_adapt: {
        id: 'chapter2_adapt',
        chapter: 2,
        background: 'seoulCity',
        character: 'countrysideWorried',
        bgm: 'mainTheme',
        text: '혼자서 서울의 규칙을 배워나가기 시작했습니다.\n\n쉽지 않았지만, 조금씩 자신감이 생겼습니다.',
        choices: [
            {
                text: '계속 탐험한다',
                effect: { hp: -5, sp: 15 },
                nextNode: 'chapter3_crisis',
                sfx: 'pageTurn'
            }
        ]
    },

    // Chapter 3: 위기 (4 nodes)
    chapter3_danger: {
        id: 'chapter3_danger',
        chapter: 3,
        background: 'seoulLuxury',
        character: 'countrysideWorried',
        bgm: 'tensionTheme',
        text: '간신히 도망쳤지만 심장이 터질 듯 뛰었습니다.\n\n"이게... 이게 서울의 삶이야?" 찌익이는 숨을 헐떡이며 생각했습니다.',
        choices: [
            {
                text: '더 안전한 곳을 찾아본다',
                effect: { hp: 10, sp: -10 },
                nextNode: 'chapter3_safe'
            },
            {
                text: '서울쥐에게 화려한 삶의 대가를 묻는다',
                effect: { hp: -5, sp: 10 },
                nextNode: 'chapter3_question'
            }
        ]
    },

    chapter3_crisis: {
        id: 'chapter3_crisis',
        chapter: 3,
        background: 'seoulLuxury',
        character: 'seoulSerious',
        bgm: 'tensionTheme',
        text: '서울쥐는 찌익이를 더 화려한 곳으로 데려갔습니다.\n\n고급 호텔의 연회장. 엄청난 양의 음식이 차려져 있었습니다.\n\n하지만 위험의 냄새도 함께 느껴졌습니다.',
        choices: [
            {
                text: '위험을 감수하고 음식을 먹는다',
                effect: { hp: -15, sp: 10 },
                nextNode: 'chapter3_risk'
            },
            {
                text: '거절하고 밖에서 기다린다',
                effect: { hp: 10, sp: -5 },
                nextNode: 'chapter3_refuse'
            }
        ]
    },

    chapter3_safe: {
        id: 'chapter3_safe',
        chapter: 3,
        background: 'seoulLuxury',
        filter: 'darken',
        character: 'countrysideWorried',
        bgm: 'tensionTheme',
        text: '조용한 공원 한구석을 찾았습니다.\n\n서울 한복판이지만, 이곳만은 평화로웠습니다.\n\n"여기가 더 나같아..." 찌익이는 생각했습니다.',
        choices: [
            {
                text: '이곳에서 쉬며 생각을 정리한다',
                effect: { hp: 15, sp: 5 },
                nextNode: 'chapter4_reflection'
            }
        ]
    },

    chapter3_question: {
        id: 'chapter3_question',
        chapter: 3,
        background: 'seoulLuxury',
        character: 'seoulSerious',
        bgm: 'tensionTheme',
        text: '"화려함과 풍요로움... 그것을 얻기 위해 무엇을 포기해야 하지?"\n\n서울쥐는 잠시 침묵하다가 대답했습니다.\n\n"평온함과 안전함... 그리고 때로는 자기 자신도."',
        choices: [
            {
                text: '그래도 도전할 가치가 있다고 생각한다',
                effect: { hp: -10, sp: 15 },
                nextNode: 'chapter4_ambition'
            },
            {
                text: '내게는 너무 큰 대가라고 느낀다',
                effect: { hp: 10, sp: -10 },
                nextNode: 'chapter4_reflection'
            }
        ]
    },

    chapter3_risk: {
        id: 'chapter3_risk',
        chapter: 3,
        background: 'seoulLuxury',
        character: 'seoulNeutral',
        bgm: 'tensionTheme',
        ambient: 'ambientRain',
        text: '음식은 정말 맛있었지만, 갑자기 호텔 직원들이 들이닥쳤습니다!\n\n아슬아슬하게 도망쳤지만, 이제 몸도 마음도 지쳐있습니다.',
        choices: [
            {
                text: '계속 이런 삶을 살 수 있을까?',
                effect: { hp: -10, sp: -10 },
                nextNode: 'chapter4_exhaustion',
                sfx: 'warning'
            }
        ]
    },

    chapter3_refuse: {
        id: 'chapter3_refuse',
        chapter: 3,
        background: 'seoulLuxury',
        character: 'countrysideNeutral',
        bgm: 'tensionTheme',
        text: '서울쥐는 실망한 듯했지만, 찌익이의 선택을 존중했습니다.\n\n"넌 정말 신중하구나. 그것도 하나의 지혜야."\n\n밖에서 기다리는 동안, 찌익이는 많은 것을 생각했습니다.',
        choices: [
            {
                text: '나에게 맞는 삶을 찾아야 한다',
                effect: { hp: 10, sp: 10 },
                nextNode: 'chapter4_wisdom'
            }
        ]
    },

    // Chapter 4: 갈등 (3 nodes)
    chapter4_reflection: {
        id: 'chapter4_reflection',
        chapter: 4,
        background: 'seoulLuxury',
        filter: 'darken',
        character: 'countrysideWorried',
        bgm: 'mainTheme',
        text: '며칠간의 서울 생활을 돌아보았습니다.\n\n화려하고 자극적이었지만, 항상 긴장해야 했고, 위험이 도사렸습니다.\n\n"행복이란 무엇일까?"',
        choices: [
            {
                text: '시골로 돌아가기로 결심한다',
                effect: { hp: 20, sp: -15 },
                nextNode: 'ending_a',
                sfx: 'choice'
            },
            {
                text: '서울과 시골의 균형을 찾아본다',
                effect: { hp: 10, sp: 10 },
                nextNode: 'ending_c',
                sfx: 'choice'
            }
        ]
    },

    chapter4_ambition: {
        id: 'chapter4_ambition',
        chapter: 4,
        background: 'seoulLuxury',
        character: 'seoulNeutral',
        bgm: 'tensionTheme',
        text: '서울에서의 성공을 꿈꾸며 더욱 열심히 살아갑니다.\n\n위험하지만, 그만큼 얻는 것도 많았습니다.\n\n"이게 내가 원하던 삶이야!"',
        choices: [
            {
                text: '서울에서 계속 살기로 한다',
                effect: { hp: -15, sp: 25 },
                nextNode: 'ending_b',
                sfx: 'choice'
            }
        ]
    },

    chapter4_exhaustion: {
        id: 'chapter4_exhaustion',
        chapter: 4,
        background: 'seoulLuxury',
        filter: 'darken',
        character: 'countrysideWorried',
        bgm: 'tensionTheme',
        ambient: 'ambientRain',
        text: '몸도 마음도 지쳐버렸습니다.\n\n화려함도, 풍요로움도 더 이상 의미가 없었습니다.\n\n"난... 무엇을 위해 이렇게 살고 있는 걸까..."',
        choices: [
            {
                text: '모든 것을 포기하고 어디론가 떠난다',
                effect: { hp: -20, sp: -20 },
                nextNode: 'ending_hidden',
                sfx: 'fail'
            }
        ]
    },

    chapter4_wisdom: {
        id: 'chapter4_wisdom',
        chapter: 4,
        background: 'seoulLuxury',
        character: 'countrysideNeutral',
        bgm: 'mainTheme',
        text: '서울의 장점과 시골의 장점을 모두 이해하게 되었습니다.\n\n"꼭 하나를 선택할 필요는 없어. 내게 맞는 균형을 찾으면 돼."\n\n진정한 지혜를 얻었습니다.',
        choices: [
            {
                text: '새로운 삶의 방식을 찾는다',
                effect: { hp: 15, sp: 15 },
                nextNode: 'ending_c',
                sfx: 'success'
            }
        ]
    },

    // Endings
    ending_a: {
        id: 'ending_a',
        chapter: 99,
        background: 'countryside',
        filter: 'sepia',
        character: 'countrysideNeutral',
        bgm: 'mainTheme',
        text: '【 엔딩 A: 평온한 시골 】\n\n찌익이는 시골로 돌아왔습니다.\n\n서울의 화려함보다 시골의 평온함이 더 소중했습니다.\n\n매일 햇살 아래에서 친구들과 뛰어놀며, 단순하지만 행복한 삶을 살았습니다.\n\n"이곳이 내가 있어야 할 곳이야."\n\n- THE END -',
        isEnding: true,
        endingId: 'ending_a'
    },

    ending_b: {
        id: 'ending_b',
        chapter: 99,
        background: 'seoulCity',
        filter: 'brightness',
        character: 'seoulNeutral',
        bgm: 'mainTheme',
        text: '【 엔딩 B: 서울의 성공 】\n\n찌익이는 서울에서 살아가는 법을 터득했습니다.\n\n위험을 피하면서도 풍요로움을 즐기는 방법을 알게 되었습니다.\n\n매일이 도전이었지만, 그만큼 자극적이고 흥미로운 삶이었습니다.\n\n"이곳에서 나는 더 성장할 수 있어!"\n\n- THE END -',
        isEnding: true,
        endingId: 'ending_b'
    },

    ending_c: {
        id: 'ending_c',
        chapter: 99,
        background: 'endingGood',
        character: null,
        bgm: 'mainTheme',
        text: '【 엔딩 C: 진정한 행복 】\n\n찌익이는 서울과 시골을 오가며 살기로 했습니다.\n\n봄과 여름은 시골에서 평화를 즐기고,\n가을과 겨울은 서울에서 새로운 경험을 쌓았습니다.\n\n두 세계의 장점을 모두 누리며,\n진정한 균형과 행복을 찾았습니다.\n\n"행복은 선택이 아니라 균형이었어!"\n\n- TRUE END -',
        isEnding: true,
        endingId: 'ending_c'
    },

    ending_hidden: {
        id: 'ending_hidden',
        chapter: 99,
        background: 'endingBad',
        character: null,
        bgm: 'tensionTheme',
        text: '【 히든 엔딩: ??? 】\n\n지쳐버린 찌익이는 모든 것을 버리고 떠났습니다.\n\n시골도, 서울도 아닌 어딘가로...\n\n그곳에서 찌익이는 무엇을 찾았을까요?\n\n아무도 모릅니다.\n\n그저 찌익이가 다시 행복해지기를 바랄 뿐입니다.\n\n"때로는... 도망치는 것도 선택이야..."\n\n- BAD END -',
        isEnding: true,
        endingId: 'ending_hidden'
    }
};
