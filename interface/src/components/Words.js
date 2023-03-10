import React from 'react'
import { Typography } from '@mui/material';

const Words = (props) => {

    let { words, tags } = props;
    console.log(words)

    return (
        words.map((word, id) => {
            return (
                <div style={{
                    marginBottom: 5,
                }}>
                    <div style={{
                        display: "flex",
                    }}>
                        <Typography variant='h5' style={{
                            marginRight: 10,
                            marginBottom: 1,
                        }}>
                            {word.name.toLowerCase()}
                        </Typography>
                        <div style={{
                            display: "flex",
                        }}>
                            {word.tags.map((tag, tid) => {
                                return (
                                    <div style={{
                                        marginRight: 10,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        borderRadius: "20%",
                                        backgroundColor: tags[tag].color,
                                        color: "white"
                                    }}>
                                        <Typography variant='tag'>{tag}</Typography>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Typography variant='h6' style={{
                        marginBottom: 5,
                    }}>
                        {word.translation.toLowerCase()}
                    </Typography>
                </div>
            )
        }
        )
    )
}

export default Words