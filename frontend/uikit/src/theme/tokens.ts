/**
 * Design Tokens
 * 
 * @generated - НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ!
 * Генерируется автоматически из tokens/tokens.json
 * Команда для пересборки: npm run tokens:build
 * 
 * Структура:
 * - primitives: базовые примитивы из "Primities/Mode 1" (цвета, шрифты и т.д.)
 * - остальное: семантические токены из "Tokens/Value" (button_text, badge и т.д.)
 * 
 * Все ссылки вида {blue.800} автоматически резолвятся в конкретные значения
 */

export const tokens = {
  primitives: {
    "3": "true",
    base: {
      black: "#191a1f",
      white: "#ffffff"
    },
    blue: {
      "0": "#eff8ff",
      "50": "#eef4ff",
      "100": "#f2f6ff",
      "200": "#d2e1ff",
      "300": "#c1d6ff",
      "400": "#5d8ff2",
      "500": "#2e90fa",
      "600": "#397cff",
      "700": "#3472ed",
      "800": "#3349ff",
      "900": "#175cd3"
    },
    green: {
      "100": "#ecfdf3",
      "200": "#eeffe0",
      "300": "#16c17c",
      "400": "#12b76a",
      "500": "#569a21",
      "600": "#027a48"
    },
    gray: {
      "100": "#f9fafc",
      "200": "#f2f4f7",
      "300": "#f3f3f3",
      "400": "#d8dde3",
      "500": "#9ca3b1",
      "600": "#a6a5a8",
      "700": "#4b4b51"
    },
    yellow: {
      "100": "#fffaeb",
      "200": "#ff9027",
      "300": "#f79009",
      "400": "#b54708"
    },
    red: {
      "100": "#fef3f2",
      "200": "#f04438",
      "300": "#e8493d",
      "400": "#b42318"
    },
    purple: {
      "100": "#f9f5ff",
      "200": "#f4f2ff",
      "300": "#9e77ed",
      "400": "#6941c6"
    },
    turquoise: {
      "100": "#6fdce3"
    },
    font_weight: {
      black: 800,
      semibold: 600,
      extra_light: 200,
      regular: 400,
      thin: 100,
      light: 300,
      bold: 700,
      medium: 500
    }
  },
  shadow: {
    color: {
      gray_70: "#c2c7d2b3",
      gray_50: "#c2c7d280",
      gray_25: "#c2c7d240",
      gray: "#f2f2f2",
      black_3: "#00000008",
      black_8: "#00000014",
      blue_50: "#71a1ff80",
      blue_30: "#397cff4d",
      blue_80: "#71a1ffcc",
      black_10: "#0000001a",
      red_20: "#e8493d33",
      blue_30_2: "#83acff4d",
      black_5: "#0000000d",
      gray_100: "#cfd1d5",
      green_20: "#12b76a33"
    },
    number: {
      position: {
        name1: 1,
        name0: 0,
        name4: 4,
        name2: 2,
        name3: 3,
        nameminus3: -3,
        name6: 6,
        name12: 12
      },
      blur: {
        name0: 0,
        name1: 1,
        name2: 2,
        name3: 3,
        name4: 4,
        name6: 6,
        name16: 16,
        name20: 20
      },
      spread: {
        name0: 0,
        name2: 2,
        name1: 1,
        name4: 4,
        name3: 3,
        nameminus2: -2,
        nameminus4: -4
      }
    }
  },
  icon: {
    color: {
      primary_1: "#3472ed",
      primary_2: "#12b76a",
      primary_3: "#16c17c",
      primary_4: "#4b4b51",
      primary_5: "#ffffff",
      primary_6: "#b42318",
      primary_7: "#e8493d",
      primary_8: "#175cd3",
      primary_9: "#027a48",
      primary_10: "#ff9027",
      primary_11: "#191a1f",
      primary_12: "#d8dde3",
      primary_13: "#9ca3b1",
      primary_14: "#a6a5a8",
      primary_15: "#4b4b51",
      primary_16: "#f04438"
    }
  },
  button_text: {
    default: {
      color: {
        fill: {
          default: "#3472ed",
          disabled: "#f3f3f3",
          hovered: "#3472ed",
          focused: "#3472ed"
        },
        text: {
          default: "#ffffff",
          disabled: "#d8dde3",
          hovered: "#ffffff",
          focused: "#ffffff"
        },
        icon: {
          default: "#ffffff",
          hovered: "#ffffff",
          focused: "#ffffff",
          disabled: "#d8dde3"
        }
      }
    },
    outlined: {
      color: {
        fill: {
          default: "#ffffff",
          hovered: "#eff8ff",
          focused: "#eff8ff"
        },
        text: {
          default: "#3472ed",
          hovered: "#3472ed",
          focused: "#3472ed"
        },
        stroke: {
          default: "#3472ed",
          hovered: "#3472ed",
          focused: "#3472ed"
        }
      }
    },
    icon_outlined: {
      color: {
        fill: {
          default: "#ffffff",
          hovered: "#eff8ff",
          focused: "#eff8ff"
        },
        text: {
          default: "#3472ed",
          hovered: "#3472ed",
          focused: "#3472ed"
        },
        stroke: {
          default: "#3472ed",
          hovered: "#3472ed",
          focused: "#3472ed"
        },
        icon: {
          default: "#3472ed",
          hovered: "#3472ed",
          focused: "#3472ed",
          disabled: "#d8dde3"
        }
      }
    },
    min: {
      color: {
        text: {
          default: "#9ca3b1",
          hovered: "#191a1f",
          focused: "#191a1f"
        }
      }
    },
    corners: {
      name3: 3
    },
    width: {
      name1: 1
    },
    gap: {
      name6: 6,
      name16: 16,
      name0: 0,
      name4: 4,
      name8: 8
    }
  },
  button_tab: {
    color: {
      text: {
        default: "#9ca3b1",
        active: "#3472ed",
        error: "#b54708",
        success: "#027a48"
      },
      stroke: {
        active: "#3472ed",
        default: "#9ca3b1",
        error: "#b54708",
        success: "#027a48"
      }
    },
    gap: {
      name0: 0,
      name4: 4,
      name8: 8
    },
    width: {
      name1: 1
    }
  },
  button_icon: {
    type: {
      blue: {
        color: {
          icon: {
            default: "#ffffff",
            hovered: "#ffffff",
            focused: "#ffffff",
            disabled: "#d8dde3"
          },
          fill: {
            default: "#3472ed",
            hovered: "#2e90fa",
            focused: "#2e90fa",
            disabled: "#f3f3f3"
          }
        }
      },
      white: {
        color: {
          fill: {
            default: "#ffffff",
            hovered: "#eff8ff",
            focused: "#eff8ff",
            active: "#3472ed"
          },
          icon: {
            default: "#3472ed",
            hovered: "#3472ed",
            focused: "#3472ed",
            active: "#ffffff"
          },
          stroke: {
            default: "#3472ed",
            hovered: "#3472ed",
            focused: "#3472ed"
          }
        }
      },
      gray: {
        color: {
          fill: {
            default: "#ffffff",
            hovered: "#f9fafc",
            focused: "#f9fafc"
          },
          icon: {
            default: "#9ca3b1",
            hovered: "#9ca3b1",
            focused: "#9ca3b1"
          },
          stroke: {
            default: "#d8dde3",
            hovered: "#d8dde3",
            focused: "#d8dde3"
          }
        }
      },
      red: {
        color: {
          fill: {
            default: "#ffffff",
            hovered: "#fef3f2",
            focused: "#fef3f2"
          },
          icon: {
            default: "#f04438",
            hovered: "#f04438",
            focused: "#f04438"
          },
          stroke: {
            default: "#f04438",
            hovered: "#f04438",
            focused: "#f04438"
          }
        }
      },
      green: {
        color: {
          fill: {
            default: "#ffffff",
            hovered: "#ecfdf3",
            focused: "#ecfdf3"
          },
          icon: {
            default: "#12b76a",
            hovered: "#12b76a",
            focused: "#12b76a"
          },
          stroke: {
            default: "#16c17c",
            hovered: "#16c17c",
            focused: "#16c17c"
          }
        }
      },
      icon: {
        color: {
          icon: {
            default: "#a6a5a8",
            hovered: "#191a1f",
            focused: "#191a1f"
          }
        }
      }
    },
    gap: {
      name0: 0,
      name4: 4,
      name8: 8
    },
    corners: {
      name2: 2,
      name3: 3
    },
    width: {
      name1: 1
    }
  },
  tooltip: {
    color: {
      fill: {
        default: "#3472ed"
      },
      text: {
        default: "#ffffff"
      }
    },
    gap: {
      name8: 8
    },
    corners: {
      name3: 3,
      name0: 0
    }
  },
  badge: {
    color: {
      fill: {
        gray: "#f2f4f7",
        primary: "#f9f5ff",
        error: "#fef3f2",
        warning: "#fffaeb",
        success: "#ecfdf3",
        blue: "#eff8ff",
        green2: "#eeffe0",
        greenyellow: "#fffaeb",
        purpleblue: "#f4f2ff",
        red: "#fef3f2",
        green: "#ecfdf3",
        filter: "#d8dde3",
        hover: "#d8dde3",
        selected: "#397cff"
      },
      text: {
        gray: "#191a1f",
        primary: "#6941c6",
        error: "#b42318",
        warning: "#b54708",
        success: "#027a48",
        blue: "#175cd3",
        purpleblue: "#9e77ed",
        green2: "#569a21",
        green: "#12b76a",
        greenyellow: "#f79009",
        filter: "#191a1f",
        red: "#e8493d",
        gray2: "#9ca3b1",
        white: "#ffffff",
        hover: "#191a1f",
        selected: "#ffffff"
      },
      icon: {
        gray: "#a6a5a8",
        primary: "#9e77ed",
        error: "#e8493d",
        warning: "#f79009",
        success: "#12b76a",
        blue: "#2e90fa",
        success2: "#569a21",
        black: "#191a1f",
        gray2: "#d8dde3",
        selected: "#ffffff"
      },
      stroke: {
        gray: "#d8dde3"
      }
    },
    corners: {
      name5: 5
    },
    gap: {
      name0: 0,
      name3: 3,
      name8: 8,
      name4: 4,
      name6: 6,
      name12: 12,
      name10: 10,
      name7: 7
    }
  },
  search: {
    color: {
      stroke: {
        hovered: "#397cff",
        default: "#f2f4f7",
        filled: "#f2f4f7",
        open_focused: "#397cff",
        input: "#f2f4f7"
      },
      text: {
        default: "#9ca3b1",
        filled: "#4b4b51",
        hovered: "#4b4b51",
        open_focused: "#4b4b51"
      },
      icon: {
        default: "#9ca3b1",
        filled: "#4b4b51",
        hovered: "#4b4b51",
        open_focused: "#4b4b51",
        input: "#4b4b51"
      },
      fill: {
        default: "#ffffff",
        filled: "#ffffff",
        hovered: "#ffffff",
        open_focused: "#ffffff",
        input: "#ffffff"
      }
    },
    gap: {
      name8: 8,
      name16: 16,
      name6: 6,
      name12: 12
    },
    corners: {
      name5: 5
    },
    width: {
      name1: 1
    }
  },
  breadcrumbs: {
    color: {
      text: {
        default: "#a6a5a8"
      }
    },
    gap: {
      name4: 4
    }
  },
  avatar: {
    color: {
      icon: {
        default: "#ffffff"
      },
      fill: {
        default: "#3472ed"
      }
    },
    gap: {
      name4: 4
    },
    corners: {
      name20: 20
    }
  },
  skeleton: {
    color: {
      skeleton: "#f3f3f3",
      fill: "#ffffff",
      stroke: "#f2f4f7"
    },
    gap: {
      name12: 12,
      name16: 16,
      name8: 8
    },
    corners: {
      name5: 5
    },
    width: {
      name1: 1
    }
  },
  chevron: {
    color: {
      icon: {
        default: "#9ca3b1"
      }
    },
    width: {
      name: 1.2
    }
  },
  checkbox: {
    color: {
      icon: {
        active: "#ffffff",
        hovered: "#ffffff",
        disabled: "#d8dde3",
        error: "#f04438",
        indeterminate_active: "#3472ed",
        indeterminate_hovered: "#3472ed"
      },
      fill: {
        default: "#ffffff",
        hovered: "#ffffff",
        disabled: "#f2f4f7",
        error: "#fef3f2",
        checked: "#3472ed",
        indeterminate_default: "#ffffff",
        indeterminate_hovered: "#ffffff"
      },
      stroke: {
        default: "#9ca3b1",
        hovered: "#3472ed",
        disabled: "#d8dde3",
        error: "#f04438",
        indeterminate_default: "#3472ed",
        indeterminate_hovered: "#3472ed"
      }
    },
    width: {
      name1: 1,
      name2: 2
    },
    corners: {
      name2: 2
    },
    size: {
      name24: 24,
      name20: 20,
      name16: 16
    }
  },
  dropdown_base: {
    color: {
      stroke: {
        default: "#f2f4f7",
        blocked: "#f2f4f7",
        disabled: "#f2f4f7",
        filled: "#f2f4f7",
        hover: "#3472ed",
        focused: "#3472ed",
        error: "#f04438",
        open_filled: "#f2f4f7"
      },
      icon: {
        default: "#9ca3b1",
        filled: "#9ca3b1",
        hover: "#9ca3b1",
        focused: "#9ca3b1",
        blocked: "#d8dde3",
        disabled: "#d8dde3",
        error: "#f04438"
      },
      fill: {
        default: "#ffffff",
        filled: "#ffffff",
        hover: "#ffffff",
        focused: "#ffffff",
        blocked: "#f9fafc",
        disabled: "#f9fafc",
        error: "#f04438",
        open_filled: "#ffffff"
      },
      text: {
        label: {
          default: "#4b4b51",
          blocked: "#4b4b51",
          disabled: "#d8dde3",
          filled: "#4b4b51",
          hover: "#4b4b51",
          focused: "#4b4b51"
        },
        placeholder: {
          default: "#d8dde3",
          filled: "#191a1f",
          blocked: "#9ca3b1",
          disabled: "#d8dde3",
          hover: "#d8dde3",
          focused: "#d8dde3"
        },
        hint: {
          error: "#f04438"
        }
      }
    },
    table: {
      color: {
        stroke: {
          default: "#d8dde3",
          hover: "#3472ed",
          focused: "#3472ed",
          blocked: "#f3f3f3",
          error: "#f04438",
          disabled: "#f3f3f3",
          filled: "#d8dde3"
        },
        text: {
          placeholder: {
            filled: "#191a1f",
            blocked: "#9ca3b1",
            default: "#d8dde3",
            disabled: "#d8dde3",
            hover: "#d8dde3",
            focused: "#d8dde3"
          }
        },
        fill: {
          default: "#ffffff",
          hover: "#ffffff",
          focused: "#ffffff",
          blocked: "#f9fafc",
          disabled: "#f9fafc",
          filled: "#ffffff"
        },
        icon: {
          default: "#9ca3b1",
          hover: "#9ca3b1",
          focused: "#9ca3b1",
          blocked: "#d8dde3",
          disabled: "#d8dde3",
          filled: "#9ca3b1"
        }
      },
      gap: {
        name4: 4,
        name8: 8,
        name6: 6
      }
    },
    width: {
      name1: 1
    },
    gap: {
      name0: 0,
      name8: 8,
      name16: 16,
      name4: 4,
      name10: 10
    },
    corners: {
      name5: 5
    }
  },
  pagination: {
    color: {
      arrow: {
        stroke: {
          default: "#f2f4f7",
          hover: "#f2f4f7",
          disabled: "#f2f4f7"
        },
        icon: {
          default: "#4b4b51",
          disabled: "#d8dde3",
          hover: "#4b4b51"
        },
        fill: {
          default: "#ffffff",
          hover: "#f3f3f3",
          disabled: "#ffffff"
        }
      },
      text: {
        default: "#4b4b51",
        active: "#ffffff"
      },
      number: {
        fill: {
          active: "#ffffff",
          active_hover: "#f3f3f3",
          selected: "#397cff",
          selected_hover: "#3472ed"
        },
        stroke: {
          active: "#f2f4f7",
          active_hover: "#f2f4f7"
        },
        text: {
          active: "#4b4b51",
          active_hover: "#4b4b51",
          selected: "#ffffff",
          selected_hover: "#ffffff"
        }
      },
      more: {
        fill: {
          default: "#ffffff",
          hover: "#f3f3f3"
        },
        stroke: {
          default: "#f2f4f7",
          hover: "#f2f4f7"
        },
        text: {
          default: "#4b4b51",
          hover: "#4b4b51"
        }
      }
    },
    width: {
      name1: 1
    },
    gap: {
      name8: 8,
      name16: 16,
      name4: 4
    },
    corners: {
      name5: 5,
      name4: 4
    }
  },
  input: {
    color: {
      text: {
        placeholder: {
          default: "#d8dde3",
          filled: "#191a1f",
          hovered: "#d8dde3",
          focused: "#d8dde3",
          disabled: "#d8dde3",
          blocked: "#9ca3b1",
          comment: "#d8dde3"
        },
        label: {
          default: "#4b4b51",
          filled: "#4b4b51",
          hovered: "#4b4b51",
          focused: "#4b4b51",
          disabled: "#d8dde3",
          blocked: "#4b4b51",
          comment: "#4b4b51"
        },
        hint: {
          default: "#9ca3b1",
          filled: "#9ca3b1",
          hovered: "#9ca3b1",
          focused: "#9ca3b1",
          disabled: "#9ca3b1",
          blocked: "#9ca3b1",
          error: "#f04438"
        }
      },
      icon: {
        error: "#e8493d",
        tooltip: "#9ca3b1",
        default: "#9ca3b1",
        filled: "#3472ed",
        focused: "#9ca3b1",
        disabled: "#d8dde3",
        line: "#191a1f"
      },
      fill: {
        default: "#ffffff",
        filled: "#ffffff",
        hovered: "#ffffff",
        focused: "#ffffff",
        disabled: "#f9fafc",
        blocked: "#f9fafc",
        comment: "#ffffff"
      },
      stroke: {
        default: "#f2f4f7",
        filled: "#f2f4f7",
        hovered: "#3472ed",
        focused: "#3472ed",
        disabled: "#f2f4f7",
        blocked: "#f2f4f7",
        comment: "#f2f4f7",
        error: "#f04438"
      }
    },
    table: {
      color: {
        text: {
          placeholder: {
            default: "#d8dde3",
            hovered: "#d8dde3",
            focused: "#d8dde3",
            filled: "#191a1f",
            disabled: "#d8dde3",
            blocked: "#9ca3b1",
            comment: "#d8dde3"
          }
        },
        fill: {
          default: "#ffffff",
          hovered: "#ffffff",
          focused: "#ffffff",
          filled: "#ffffff",
          disabled: "#f9fafc",
          blocked: "#f9fafc"
        },
        stroke: {
          default: "#d8dde3",
          hovered: "#3472ed",
          focused: "#3472ed",
          filled: "#d8dde3",
          disabled: "#d8dde3",
          blocked: "#d8dde3",
          error: "#f04438"
        }
      }
    },
    gap: {
      name8: 8,
      name4: 4
    },
    corners: {
      name5: 5
    },
    stroke: {
      name1: 1
    }
  },
  scroll: {
    color: {
      scroll: "#d8dde3"
    },
    width: {
      name4: 4
    },
    height: {
      name428: 428,
      name107: 107,
      name214: 214,
      name256: 256
    },
    corners: {
      name8: 8
    }
  },
  preloader: {
    color: {
      preloader: "#d8dde3"
    },
    size: {
      name16: 16,
      name18: 18
    }
  },
  progress: {
    vertical: {
      color: {
        point: {
          bluy: "#3472ed",
          grey: "#9ca3b1",
          white: "#ffffff"
        },
        text: {
          done: "#9ca3b1",
          here: "#4b4b51",
          default: "#9ca3b1"
        }
      },
      gap: {
        text: {
          name0: 0,
          name8: 8,
          nameminus1: -1
        }
      }
    },
    horizontal: {
      corners: {
        name8: 8
      },
      gap: {
        name8: 8,
        name0: 0
      },
      size: {
        width: {
          name4: 4
        }
      }
    }
  },
  navbar: {
    color: {
      fill: "#ffffff"
    },
    gap: {
      name16: 16,
      name10: 10,
      name88: 88
    }
  },
  message: {
    color: {
      stroke: "#f2f4f7",
      fill: "#ffffff"
    },
    gap: {
      name10: 10,
      name16: 16,
      name8: 8,
      name0: 0,
      name4: 4
    },
    stroke: {
      name1: 1
    },
    corners: {
      name5: 5
    }
  },
  text_label: {
    color: {
      text_label: "#4b4b51"
    }
  },
  bg: {
    color: {
      bg: "#0c0c0d99"
    }
  },
  time_picker: {
    color: {
      text: {
        placeholder: {
          default: "#d8dde3",
          filled: "#191a1f",
          ranged: "#d8dde3",
          hovered: "#d8dde3",
          disabled: "#d8dde3",
          focused: "#d8dde3",
          disabled_filled: "#d8dde3",
          error: "#d8dde3",
          focused_line: "#4b4b51",
          disabled_ranged: "#d8dde3",
          blocked: "#9ca3b1"
        },
        hint: {
          error: "#f04438"
        },
        label: {
          default: "#4b4b51",
          filled: "#4b4b51",
          ranged: "#4b4b51",
          focused: "#4b4b51",
          focused_line: "#4b4b51",
          hovered: "#4b4b51",
          error: "#4b4b51",
          blocked: "#4b4b51"
        }
      },
      stroke: {
        default: "#f2f4f7",
        filled: "#f2f4f7",
        hovered: "#3472ed",
        focused: "#3472ed",
        focused_line: "#f2f4f7",
        disabled: "#f2f4f7",
        disabled_filled: "#f2f4f7",
        disabled_ranged: "#f2f4f7",
        error: "#f04438",
        ranged: "#f2f4f7",
        blocked: "#f2f4f7"
      },
      icon: {
        default: "#d8dde3",
        filled: "#3472ed",
        focused: "#3472ed",
        hovered: "#3472ed",
        disabled: "#d8dde3",
        error: "#d8dde3",
        ranged: "#d8dde3",
        disabled_filled: "#d8dde3",
        focused_line: "#3472ed",
        disabled_ranged: "#d8dde3",
        blocked: "#d8dde3"
      },
      fill: {
        default: "#ffffff",
        filled: "#ffffff",
        ranged: "#ffffff",
        focused_line: "#ffffff",
        hovered: "#ffffff",
        focused: "#ffffff",
        disabled: "#f9fafc",
        disabled_filled: "#f9fafc",
        disabled_ranged: "#f9fafc",
        error: "#ffffff",
        blocked: "#f9fafc"
      }
    },
    corners: {
      name5: 5
    },
    stroke: {
      name1: 1
    },
    gap: {
      name4: 4,
      name8: 8
    }
  },
  dropdown_list_items: {
    color: {
      icon: {
        default: "#3472ed",
        hover: "#3472ed",
        focused: "#3472ed",
        disabled: "#d8dde3"
      },
      fill: {
        default: "#ffffff",
        focused: "#ffffff",
        hovered: "#eef4ff",
        disabled: "#f9fafc"
      },
      text: {
        focused: "#191a1f",
        disabled: "#d8dde3",
        hover: "#191a1f",
        default: "#191a1f"
      },
      ava: {
        default: "#d8dde3"
      }
    },
    gap: {
      name16: 16,
      name8: 8
    },
    size: {
      width: 36,
      length: 350
    }
  },
  data_picker: {
    color: {
      text: {
        placeholder: {
          default: "#d8dde3",
          filled: "#191a1f",
          hovered: "#d8dde3",
          focused: "#d8dde3",
          disabled: "#d8dde3",
          error: "#d8dde3",
          blocked: "#9ca3b1"
        },
        label: {
          default: "#4b4b51",
          filled: "#4b4b51",
          focused: "#4b4b51",
          hovered: "#4b4b51",
          error: "#4b4b51",
          disabled: "#d8dde3",
          blocked: "#4b4b51"
        },
        hint: {
          error: "#f04438"
        }
      },
      fill: {
        default: "#ffffff",
        filled: "#ffffff",
        focused: "#ffffff",
        hovered: "#ffffff",
        disabled: "#f9fafc",
        error: "#ffffff",
        blocked: "#f9fafc"
      },
      stroke: {
        default: "#f2f4f7",
        filled: "#f2f4f7",
        hovered: "#3472ed",
        focused: "#3472ed",
        disabled: "#f2f4f7",
        error: "#f04438",
        blocked: "#f2f4f7"
      },
      icon: {
        default: "#9ca3b1",
        filled: "#3472ed",
        hovered: "#3472ed",
        focused: "#3472ed",
        disabled: "#9ca3b1",
        error: "#9ca3b1",
        blocked: "#d8dde3"
      }
    },
    table: {
      color: {
        text: {
          placeholder: {
            default: "#d8dde3",
            filled: "#191a1f",
            hovered: "#d8dde3",
            focused: "#d8dde3",
            disabled: "#d8dde3",
            blocked: "#9ca3b1",
            error: "#d8dde3"
          }
        },
        fill: {
          default: "#ffffff",
          filled: "#ffffff",
          hovered: "#ffffff",
          focused: "#ffffff",
          disabled: "#f9fafc",
          blocked: "#f9fafc",
          error: "#ffffff"
        },
        stroke: {
          default: "#d8dde3",
          filled: "#d8dde3",
          hovered: "#3472ed",
          focused: "#3472ed",
          disabled: "#d8dde3",
          blocked: "#d8dde3",
          error: "#f04438"
        },
        icon: {
          default: "#9ca3b1",
          filled: "#3472ed",
          disabled: "#9ca3b1",
          blocked: "#d8dde3",
          hovered: "#3472ed",
          focused: "#3472ed",
          error: "#9ca3b1"
        }
      }
    },
    gap: {
      name4: 4,
      name8: 8
    },
    corners: {
      name5: 5
    },
    stroke: {
      name1: 1
    }
  },
  dropdown_menu: {
    color: {
      fill: {
        default: "#ffffff"
      },
      stroke: {
        default: "#f2f4f7"
      }
    },
    gap: {
      name8: 8,
      name16: 16
    },
    corners: {
      name5: 5
    },
    width: {
      name1: 1
    }
  },
  sidebar: {
    color: {
      fill: {
        default: "#ffffff",
        active: "#f2f6ff",
        hover: "#f2f6ff"
      },
      item: "#4b4b51",
      text: {
        default: "#4b4b51"
      },
      icon: {
        default: "#4b4b51",
        hover: "#4b4b51",
        active: "#3472ed"
      },
      chevron: {
        default: "#4b4b51",
        hover: "#4b4b51",
        active: "#4b4b51"
      }
    },
    stroke: {
      default: "#d8dde3"
    },
    gap: {
      name20: 20,
      name16: 16,
      name8: 8,
      name4: 4,
      name10: 10,
      name0: 0,
      name24: 24
    }
  },
  input_dropdown: {
    сolor: {
      stroke: "#f2f4f7"
    },
    gap: {
      name8: 8,
      name4: 4
    }
  },
  table: {
    color: {
      fill: "#f3f3f3",
      item: "#4b4b51",
      text: {
        default: "#191a1f",
        secondary: "#9ca3b1"
      },
      icon: {
        default: "#191a1f",
        hover_active: "#3472ed",
        disabled: "#9ca3b1"
      },
      stroke: {
        default: "#f2f4f7"
      }
    },
    gap: {
      name4: 4,
      name8: 8,
      name10: 10,
      name16: 16,
      name20: 20
    }
  },
  error: "#f04438",
  label: "#4b4b51",
  news: {
    color: {
      text: {
        default: "#ffffff"
      },
      icon: {
        icon: "#ffffff",
        icon2: "#3472ed"
      },
      fill: {
        default: "#3472ed",
        default2: "#6d9eff",
        default3: "#1547a9",
        default_20: "#ffffff33",
        default_50: "#ffffff80",
        default_100: "#ffffff",
        default_0: "#ffffff00"
      }
    }
  },
  logo: {
    color: {
      text: {
        default: "#3472ed"
      },
      icon: {
        icon: "#3472ed",
        icon2: "#1547a9",
        icon3: "#6d9eff"
      }
    }
  },
  label_disabled: "#d8dde3",
  textarea: {
    color: "#ffffff"
  },
  divider: {
    color: {
      fill: "#f3f3f3"
    }
  },
  search_list_item: {
    color: {
      text: "#191a1f",
      icon: "#3472ed",
      fill: "#ffffff",
      hover: "#eef4ff"
    },
    gap: {
      name2: 2,
      name4: 4,
      name8: 8,
      name16: 16
    }
  },
  calendar: {
    color: {
      month_and_year: {
        text: {
          default: "#191a1f",
          selected: "#ffffff",
          disabled: "#a6a5a8",
          hover: "#191a1f"
        },
        fill: {
          selected: "#397cff",
          default: "#ffffff",
          hover: "#f2f4f7",
          disabled: "#ffffff"
        }
      },
      icons: {
        default: "#a6a5a8",
        preloader: "#d8dde3"
      },
      stroke: {
        default: "#f3f3f3"
      },
      cell: {
        base_day: {
          text: {
            default: "#191a1f",
            hover: "#191a1f",
            selected: "#ffffff"
          },
          fill: {
            default: "#ffffff",
            hover: "#f2f4f7",
            selected: "#397cff",
            period: "#397cff"
          }
        },
        today: {
          fill: {
            default: "#ffffff",
            hover: "#f2f4f7",
            selected: "#397cff",
            period: "#397cff"
          },
          text: {
            default: "#397cff",
            hover: "#397cff",
            selected: "#ffffff"
          },
          stroke: {
            default: "#397cff",
            hover: "#397cff",
            selected: "#397cff"
          }
        },
        weekend: {
          text: {
            default: "#f04438",
            hover: "#f04438",
            selected: "#ffffff"
          },
          fill: {
            default: "#ffffff",
            hover: "#f2f4f7",
            selected: "#397cff",
            disabled: "#ffffff",
            period: "#397cff"
          }
        },
        period: {
          text: {
            base_default: "#ffffff",
            base_hover: "#ffffff",
            today_default: "#ffffff",
            weekend_default: "#ffffff",
            today_hover: "#ffffff",
            weekend_hover: "#ffffff",
            another_month_default: "#ffffff",
            another_month_hover: "#ffffff"
          },
          fill: {
            base_default: "#397cff",
            base_hover: "#3472ed",
            today_default: "#397cff",
            weekend_default: "#397cff",
            today_hover: "#3472ed",
            weekend_hover: "#3472ed",
            another_month_default: "#397cff",
            another_month_hover: "#3472ed"
          }
        },
        another_month: {
          text: {
            default: "#a6a5a8",
            hover: "#a6a5a8",
            selected: "#ffffff"
          },
          fill: {
            default: "#ffffff",
            hover: "#f2f4f7",
            selected: "#397cff"
          }
        },
        today_another_month: {
          text: {
            default: "#a6a5a8",
            hover: "#a6a5a8",
            selected: "#ffffff"
          },
          fill: {
            default: "#ffffff",
            hover: "#f2f4f7",
            selected: "#397cff"
          },
          stroke: {
            default: "#a6a5a8",
            hover: "#a6a5a8",
            selected: "#397cff"
          }
        }
      },
      text: {
        primary: "#191a1f",
        secondary: "#a6a5a8"
      },
      fill: {
        fill: "#ffffff"
      }
    },
    gap: {
      name0: 0,
      name24: 24,
      name12: 12,
      name20: 20,
      name14: 14,
      name2: 2,
      name6: 6,
      name8: 8,
      name16: 16,
      name4: 4
    },
    corners: {
      name4: 4,
      name5: 5,
      name0: 0
    }
  },
  button_calendar: {
    color: {
      default: "#397cff",
      hover: "#3472ed",
      focused: "#3472ed"
    }
  },
  time: {
    text: {
      default: "#191a1f",
      hover: "#191a1f",
      selected: "#ffffff"
    },
    fill: {
      default: "#ffffff",
      hover: "#f2f4f7",
      selected: "#397cff"
    },
    corners: {
      name4: 4
    },
    gap: {
      name16: 16,
      name0: 0,
      name8: 8,
      name4: 4,
      name2: 2,
      name6: 6
    }
  },
  typography: {
    font_family: "Inter",
    heading: {
      h1: {
        font_size: 24,
        line_height: 30,
        letter_spacing: 0,
        font_weight: 600
      },
      h2: {
        font_size: 20,
        font_weight: 600,
        line_height: 24,
        letter_spacing: 0
      },
      h3: {
        font_size: 16,
        font_weight: 600,
        line_height: 20,
        letter_spacing: 0
      }
    },
    paragraph: {
      p1: {
        font_size: 16,
        font_weight: 500,
        line_height: 20,
        letter_spacing: 0
      },
      p2: {
        font_size: 16,
        font_weight: 400,
        line_height: 20,
        letter_spacing: 0
      },
      p3: {
        font_size: 14,
        font_weight: 500,
        line_height: 18,
        letter_spacing: 0
      },
      p4: {
        font_size: 14,
        font_weight: 400,
        line_height: 18,
        letter_spacing: 0
      },
      p5: {
        font_size: 10,
        font_weight: 500,
        line_height: 12,
        letter_spacing: 0
      },
      p6: {
        font_size: 10,
        font_weight: 400,
        line_height: 12,
        letter_spacing: 0
      }
    },
    tooltip: {
      t1: {
        font_size: 8,
        font_weight: 400,
        line_height: 10,
        letter_spacing: 0
      }
    },
    badge: {
      font_size: 12,
      font_weight: 500,
      line_height: 18,
      letter_spacing: 0
    },
    number: 0
  }
};

export type TokensType = typeof tokens;
