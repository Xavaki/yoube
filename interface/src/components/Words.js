import React, { useState } from 'react'
import { Typography, Chip, Skeleton } from '@mui/material';



const WordTranslationField = props => {
    let {
        text,
        isSelected,
        handleFieldSelect
    } = props;

    let [wordText, setWordText] = useState(text);
    let fontColor = isSelected ? "orange" : "black"

    if (isSelected) {
        document.onkeypress = function (e) {
            e = e || window.event;
            // desselect word on enter
            if (e.key === 'Enter') {
                handleFieldSelect(null);
            } else {
                setWordText(wordText + e.key);
            }
        };
        document.onkeydown = function (e) {
            e = e || window.event;
            if (e.key === 'Backspace') {
                setWordText(wordText.slice(0, -1))
            }
            // console.log(e.key)
        };
    }


    let displayText = () => {
        return (
            <div style={{ display: "flex" }}>
                {wordText.toLowerCase()}
                <Skeleton sx={{ bgcolor: fontColor, position: "relative", left: 3, visibility: isSelected ? "visible" : "hidden" }} />
            </div>
        )
    }

    return (
        <Typography variant='h6' style={{
            marginBottom: 5,
            // color: fontColor,
        }}
            onClick={() => handleFieldSelect("translation")}
        >
            {displayText()}
        </Typography>
    )


}

const WordNameField = props => {
    let {
        text,
        isSelected,
        handleFieldSelect
    } = props;

    let [wordText, setWordText] = useState(text);
    let fontColor = isSelected ? "orange" : "black"

    if (isSelected) {
        document.onkeypress = function (e) {
            if (e.code === 'Space') { e.preventDefault() }
            e = e || window.event;
            // desselect word on enter
            if (e.key === 'Enter') {
                handleFieldSelect("translation");
            } else {
                setWordText(wordText + e.key);
            }
        };
        document.onkeydown = function (e) {
            e = e || window.event;
            if (e.key === 'Backspace') {
                setWordText(wordText.slice(0, -1))
            }
        };
    }


    let displayText = () => {
        return (
            <div style={{ display: "flex" }}>
                {wordText.toLowerCase()}
                <Skeleton sx={{ bgcolor: fontColor, position: "relative", left: 2, visibility: isSelected ? "visible" : "hidden" }} />
            </div>
        )
    }

    return (
        <Typography variant='h5' style={{
            marginRight: 10,
            marginBottom: 1,
            // color: fontColor,
            cursor: isSelected ? null : "pointer",
        }}

            onClick={() => handleFieldSelect("name")}
        >
            {displayText()}
        </Typography >
    )


}

const Word = props => {

    let {
        id,
        word,
        allTags,
        isSelected,
        handleSelectWord,
        handleDesselectWord
    } = props;

    let [wordText, setWordText] = useState(word.name);
    let fontColor = isSelected ? "gray" : "black";
    let [selectedField, setSelectedField] = useState("name");

    let clickWord = () => {
        handleSelectWord(id);
    }

    let handleFieldSelect = fieldname => {
        setSelectedField(fieldname);
    }

    return (
        <div
            style={{
                marginBottom: 5,
            }}
            onClick={() => clickWord()}
        >
            <div style={{
                display: "flex",
            }}
            >
                <WordNameField
                    text={word.name}
                    isSelected={isSelected && selectedField === "name"}
                    handleFieldSelect={handleFieldSelect}
                />
                <div style={{
                    display: "flex",
                }}>
                    {word.tags.map((tag, tid) => {
                        return (
                            <Chip
                                size="small"
                                label={tag}
                                onClick={() => { }}
                                style={{
                                    marginRight: 3,
                                    // color: "white",
                                    backgroundColor: allTags[tag].color,
                                }} />
                        )
                    })}
                </div>
            </div>
            <WordTranslationField
                text={word.translation}
                isSelected={isSelected && selectedField === "translation"}
                handleFieldSelect={handleFieldSelect}
            />
        </div>
    )
}


const AddWord = props => {

    let {
        id,
        isSelected,
        handleSelectWord,
        handleDesselectWord
    } = props;

    let [wordText, setWordText] = useState("");

    if (isSelected) {
        document.onkeypress = function (e) {
            e = e || window.event;
            // desselect word on enter
            if (e.key === 'Enter') {
                handleDesselectWord()
            } else {
                setWordText(wordText + e.key);
            }
        };
        document.onkeydown = function (e) {
            e = e || window.event;
            if (e.key === 'Backspace') {
                setWordText(wordText.slice(0, -1))
            }
            // console.log(e.key)
        };
    }

    let clickWord = () => {
        handleSelectWord(0)
    }

    let wordField = () => {
        if (isSelected) {
            return wordText === "" ? <Skeleton /> : wordText
        } return <Skeleton animation={false} />
    }


    return (
        <div
            style={{
                marginBottom: 10,
            }}>
            <div style={{
                display: "flex",
            }}>
                <Typography variant='h5' style={{
                    marginRight: 10,
                    marginBottom: 1,
                    width: "20%",
                    cursor: "pointer",
                }}

                    onClick={() => clickWord()}
                >
                    {wordField()}
                </Typography>
            </div>
            <Typography variant='h6' style={{
                marginBottom: 5,
                width: "10%",
                // color: fontColor,
            }}>
                <Skeleton animation={false} />
            </Typography>
        </div>
    )
}
const Words = props => {

    let [selectedWord, setSelectedWord] = useState(null);

    let { words, tags } = props;
    console.log(words);

    let handleSelectWord = (id) => {
        setSelectedWord(id);
    }

    let handleDesselectWord = () => {
        setSelectedWord(null);
    }

    return (
        <>
            {/* <AddWord
                id={0}
                isSelected={selectedWord === 0}
                handleSelectWord={handleSelectWord}
                handleDesselectWord={handleDesselectWord}
            /> */}
            {words.map((word, id) => {
                return (
                    <Word
                        id={id + 1}
                        word={word}
                        allTags={tags}
                        isSelected={selectedWord === id + 1}
                        handleSelectWord={handleSelectWord}
                        handleDesselectWord={handleDesselectWord}
                    />

                )
            })}
        </>
    )
}

export default Words