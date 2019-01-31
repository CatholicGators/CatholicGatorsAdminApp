import { SheetsRegistry, GenerateClassName } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export interface PageContext {
  theme: any,
  sheetsManager: Map<any,any>,
  sheetsRegistry: SheetsRegistry,
  generateClassName: GenerateClassName
}

function createPageContext() : PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process["browser"]) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}