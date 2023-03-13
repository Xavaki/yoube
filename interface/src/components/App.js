import React, { useEffect, useState } from 'react'
import {
    Button, Grid, LinearProgress,
    Paper, Radio, ThemeProvider,
    Typography
} from '@mui/material';
import { THEME } from '../theme';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { mockWords, mockTags } from '../mock';
import Words from './Words';

const App = () => {

    const { height, width } = useWindowDimensions();
    const [words, setWords] = useState([]);
    const [wordsFetched, setWordsFetched] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagsFetched, setTagsFetched] = useState(false);
    let [selectedWord, setSelectedWord] = useState(null);
    let handleSelectWord = (id) => {
        setSelectedWord(id);
    }

    let handleDesselectWord = () => {
        setSelectedWord(null);
    }

    const fetchWords = async () => {
        if (!wordsFetched) {
            setWords(mockWords);
            setWordsFetched(true);
        }
    }
    const fetchTags = async () => {
        if (!tagsFetched) {
            setTags(mockTags);
            setTagsFetched(true);
        }
    }
    useEffect(() => {
        fetchWords();
        fetchTags();
    }, [])
    // fetchTags();

    let addWord = index => {
        const temp = [...words]
        temp.splice(index, 0, {
            id: "",
            name: "",
            translation: "",
            examples: [],
            tags: [],
        })
        setWords(temp)
    }

    let deleteWord = index => {
        setWords(words.filter((word, id) => id !== index))
    }


    return (
        <ThemeProvider theme={THEME}>
            <div className="siito-body" style={{
                height: `${height}px`,
                width: `${width}px`,
                margin: 15,
            }}>
                {/* <LinearProgress style={{ visibility: loading ? "visible" : "hidden" }} /> */}
                <div className='titlebar' style={{
                    marginBottom: 3,
                }}>
                    <div
                        style={{
                            display: "flex",
                            // justifyContent: "space-between",
                            marginLeft: 15,
                        }}>
                        <Typography
                            variant="h3"
                            style={{
                                // marginRight: 15,
                            }}
                        >ottononooto 🐱</Typography>
                    </div>
                </div>
                <Grid container>
                    <Grid item xs={6} sx={{
                        // backgroundColor: "orange",
                        padding: 0,
                    }}>
                        <Paper sx={{
                            height: "100%",
                            boxShadow: "none",
                        }}>
                            {/* <Paper sx={{
                                height: "15%",
                                width: "70%",
                                backgroundColor: "whitesmoke",
                                marginBottom: 2,
                            }}
                                elevation={0}
                            >
                            </Paper> */}
                            <Paper sx={{
                                height: "100%",
                                // backgroundColor: "whitesmoke",
                                marginBottom: 20,
                                overFlowY: "scroll"
                            }}
                                elevation={0}
                            >
                                <Words
                                    words={words}
                                    tags={tags}
                                    addWord={addWord}
                                    selectedWord={selectedWord}
                                    handleSelectWord={handleSelectWord}
                                    handleDesselectWord={handleDesselectWord}
                                    deleteWord={deleteWord}
                                />
                            </Paper>

                        </Paper>
                    </Grid>
                    {/* <Grid item xs={4} sx={{
                        backgroundColor: "blue",
                    }}>
                    </Grid>
                    <Grid item xs={4} sx={{
                        backgroundColor: "green",
                    }}>
                    </Grid> */}
                </Grid>
            </div>
        </ThemeProvider>
    )
}

export default App