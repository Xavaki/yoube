import { createTheme, responsiveFontSizes } from "@mui/material";

const primaryColor = "#ed6c02";

export const THEME =
    responsiveFontSizes(createTheme({
        typography: {
            tag: {
                fontFamily: [
                    '"Inter", monospace',
                    // '"Montserrat", sans-serif',
                    // '-apple-system',
                    // 'BlinkMacSystemFont',
                    // '"Segoe UI"',
                    // 'Roboto',
                    // '"Helvetica Neue"',
                    // 'Arial',
                    // 'sans-serif',
                    // '"Apple Color Emoji"',
                    // '"Segoe UI Emoji"',
                    // '"Segoe UI Symbol"',
                ].join(','),
                fontSize: 13,
                fontWeight: 500,
            },
            fontSize: 13,
            fontFamily: [
                '"Inter", monospace',
                // '"Montserrat", sans-serif',
                // '-apple-system',
                // 'BlinkMacSystemFont',
                // '"Segoe UI"',
                // 'Roboto',
                // '"Helvetica Neue"',
                // 'Arial',
                // 'sans-serif',
                // '"Apple Color Emoji"',
                // '"Segoe UI Emoji"',
                // '"Segoe UI Symbol"',
            ].join(','),
        },
        components: {
            MuiGrid: {
                styleOverrides: {
                    container: {
                        height: "100%",
                    },
                    item: {
                        height: "100%",
                        padding: 4,
                    },
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        padding: 6,
                    }
                },
            },
            MuiStack: {
                styleOverrides: {
                    root: {
                        height: "100%",
                        width: "100%"
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    subtitle1: {
                        fontWeight: "bold"
                    },
                    h5: {
                        fontWeight: "600"
                    },
                    h3: {
                        fontWeight: "bold"
                    },
                    h6: {
                        fontStyle: "italic"
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: 'whitesmoke'
                        }
                    },
                }
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        maxWidth: "none",
                        padding: 10,
                        backgroundColor: "teal",
                    },
                }
            },
        },
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: primaryColor,
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: '#aebfbf',
            },
            // dev: {
            //     main: '#ed6c02',
            // },
        }
    }));