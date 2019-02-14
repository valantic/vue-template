// To find the correct 'section' name, try to use React Developer Tools
// @see https://react-styleguidist.js.org/docs/cookbook.html#how-to-change-styles-of-a-style-guide
module.exports = {
  theme: {
    maxWidth: '100%',
    sidebarWidth: 270,
    color: {
      link: '#5856d6',
      linkHover: 'rgb(70, 69, 171)',
      sidebarBackground: '#2c68a0',
      sidebarBorder: '0',
      errorBackground: '#b50f0f',
      cursor: 'pointer'
    },
    fontFamily: {
      base: '"Source Sans Pro", "Trebuchet MS", Arial, sans-serif'
    }
  },
  styles: {
    StyleGuide: {
      root: {
        // 'text-rendering': 'optimizeLegibility',
        // '-moz-osx-font-smoothing': 'grayscale',
        // '-webkit-font-smoothing': 'antialiased',
      },
      sidebar: {},
      content: {},
      logo: {
        border: 'none',
        paddingBottom: 0
      },
    },
    Logo: {
      logo: {
        color: '#fff',
        fontSize: 20
      }
    },
    Heading: {
      heading1: {
        'color': '#2c68a0',
        'width': '100%',
        'textAlign': 'left',
        '& a': {
          '&:hover': {
            textDecoration: 'none',
            color: '#2c68a0 !important',
            cursor: 'pointer !important'
          }
        }
      },
      heading2: {
        'backgroundColor': '#2c68a0',
        'color': '#fff',
        'width': 'calc(100% + 32px)',
        'padding': '0px 30px',
        'marginLeft': '-33px',
        'zIndex': '1',
        '& a': {
          '&:hover': {
            textDecoration: 'none',
            color: '#fff !important',
            cursor: 'pointer !important'
          }
        }
      }
    },
    ComponentsList: {
      list: {
        '& ul': {
          paddingLeft: 0
        }
      },
      item: {
        '& a': {
          'color': 'rgba(255, 255, 255, 0.9) !important',
          'fontWeight': 500,
          '&:hover': {
            textDecoration: 'underline',
            color: '#fff !important',
            cursor: 'pointer !important'
          }
        }
      },
      heading: {
        fontSize: '18px !important',
        fontWeight: '600 !important',
        color: '#fff !important'
      }
    },
    Table: {
      cell: {
        borderBottom: '1px solid #e8e8e8',
      }
    },
    Code: {
      code: {
        padding: '2px 4px',
        fontSize: '90%',
        color: '#c7254e',
        backgroundColor: '#f9f2f4',
        borderRadius: '4px',
      },
    }
  }
};
