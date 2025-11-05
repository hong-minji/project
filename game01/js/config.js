// Game Configuration
const CONFIG = {
    // Game Info
    GAME_NAME: '찌익(Choice): 행복을 찾아서',
    VERSION: '2.0',

    // Performance
    INITIAL_LOAD_TIME: 2000,
    TEXT_SPEED: 30,
    TRANSITION_SPEED: 500,

    // Stats
    INITIAL_HP: 100,
    INITIAL_SP: 100,
    MAX_HP: 100,
    MAX_SP: 100,

    // Audio
    DEFAULT_BGM_VOLUME: 0.7,
    DEFAULT_SFX_VOLUME: 0.8,

    // Storage Keys
    SAVE_KEY: 'countrymouse_save',
    SETTINGS_KEY: 'countrymouse_settings',
    ENDINGS_KEY: 'countrymouse_endings',

    // Asset Paths
    ASSETS: {
        backgrounds: {
            countryside: 'assets/images/backgrounds/countryside.webp',
            seoulCity: 'assets/images/backgrounds/seoul_city.webp',
            seoulLuxury: 'assets/images/backgrounds/seoul_luxury.webp',
            endingGood: 'assets/images/endings/ending_good.webp',
            endingBad: 'assets/images/endings/ending_bad.webp'
        },
        characters: {
            countrysideNeutral: 'assets/images/characters/countryside_neutral.webp',
            countrysideWorried: 'assets/images/characters/countryside_worried.webp',
            seoulNeutral: 'assets/images/characters/seoul_neutral.webp',
            seoulSerious: 'assets/images/characters/seoul_serious.webp'
        },
        videos: {
            opening: 'assets/videos/opening.mp4',
            ending: 'assets/videos/ending.mp4'
        },
        bgm: {
            mainTheme: 'assets/audio/bgm/main_theme.mp3',
            tensionTheme: 'assets/audio/bgm/tension_theme.mp3'
        },
        sfx: {
            click: 'assets/audio/sfx/click.mp3',
            choice: 'assets/audio/sfx/choice.mp3',
            pageTurn: 'assets/audio/sfx/page_turn.mp3',
            warning: 'assets/audio/sfx/warning.mp3',
            success: 'assets/audio/sfx/success.mp3',
            fail: 'assets/audio/sfx/fail.mp3',
            ambientCity: 'assets/audio/sfx/ambient_city.mp3',
            ambientRain: 'assets/audio/sfx/ambient_rain.mp3'
        }
    },

    // Endings
    ENDINGS: [
        {
            id: 'ending_a',
            name: '평온한 시골',
            description: '시골로 돌아가 평화로운 삶을 살았습니다',
            background: 'countryside',
            filter: 'sepia',
            requiredStats: { hp: 70, sp: 50 }
        },
        {
            id: 'ending_b',
            name: '서울의 성공',
            description: '서울에서 성공적인 삶을 살았습니다',
            background: 'seoulCity',
            filter: 'brightness',
            requiredStats: { hp: 50, sp: 70 }
        },
        {
            id: 'ending_c',
            name: '진정한 행복',
            description: '균형 잡힌 삶을 찾았습니다',
            background: 'endingGood',
            filter: null,
            requiredStats: { hp: 80, sp: 80 }
        },
        {
            id: 'ending_hidden',
            name: '???',
            description: '숨겨진 엔딩을 발견했습니다',
            background: 'endingBad',
            filter: null,
            requiredStats: { hp: 30, sp: 30 }
        }
    ]
};
