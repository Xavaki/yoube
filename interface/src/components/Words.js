import React, { useEffect, useState } from 'react'
import { Typography, Chip, Skeleton } from '@mui/material';
import { toKana } from 'wanakana';


const WordTranslationField = props => {
    let {
        text,
        isSelected,
        handleFieldSelect
    } = props;

    let fontColor = isSelected ? "orange" : "black"

    let displayText = () => {
        return (
            <div style={{ display: "flex" }}>
                {text.toLowerCase()}
                <Skeleton sx={{ bgcolor: fontColor, position: "relative", left: 3, visibility: isSelected ? "visible" : "hidden" }} />
            </div>
        )
    }

    return (
        <Typography variant='h6' style={{
            marginBottom: 0,
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
    let fontColor = isSelected ? "orange" : "black"
    let displayText = () => {
        return (
            <div style={{ display: "flex" }}>
                {text.toLowerCase()}
                <Skeleton sx={{ bgcolor: fontColor, position: "relative", left: 2, visibility: isSelected ? "visible" : "hidden" }} />
            </div>
        )
    }

    return (
        <div
            onClick={() => handleFieldSelect("name")}
            style={{
                display: "flex",
                marginRight: 10,
                marginBottom: 0,
                // color: fontColor,
                cursor: isSelected ? null : "pointer",
            }}
        >
            <Typography variant='h5' style={{

            }}
            >
                {displayText()}
            </Typography >
            {(text !== "") &&
                <>
                    <Typography variant='h5' style={{
                        marginLeft: 5,
                        marginRight: 8
                    }}
                    >
                        ·
                    </Typography >
                    <Typography variant='h5' style={{
                    }}
                    >
                        {toKana(text)}
                    </Typography >
                </>
            }
        </div>
    )


}

const Word = props => {

    let {
        id,
        word,
        allTags,
        isSelected,
        handleSelectWord,
        addWord,
        deleteWord,
    } = props;

    let fontColor = isSelected ? "gray" : "black";
    let [selectedField, setSelectedField] = useState("name");

    let clickWord = () => {
        handleSelectWord(id);
    }

    let handleFieldSelect = fieldname => {
        if (!(fieldname === 'translation' && nameText === "")) {
            setSelectedField(fieldname);
        }
    }

    let [nameText, setNameText] = useState(word.name);
    let [translationText, setTranslationText] = useState(word.translation);

    useEffect(() => {
        setNameText(word.name);
        setTranslationText(word.translation)
    }, [word])

    let addAndSelectWord = () => {
        addWord(id + 1)
        handleSelectWord(id + 1)
    }

    let deleteAndSelectPrevWord = () => {
        handleSelectWord(id - 1)
        deleteWord(id)
    }

    if (isSelected) {
        document.onkeypress = function (e) {
            e = e || window.event;
            // desselect word on enter
            if (e.key === 'Enter') {
                if (selectedField === 'translation') {
                    addAndSelectWord()
                } else { handleFieldSelect('translation') }
            } else {
                if (selectedField === 'name') {
                    setNameText(nameText + e.key)
                } else if (selectedField === 'translation') {
                    setTranslationText(translationText + e.key);
                }
            }
        };
        document.onkeydown = function (e) {
            e = e || window.event;
            if (e.key === 'Backspace') {
                if (selectedField === 'name') {
                    if (nameText.length === 0) {
                        deleteAndSelectPrevWord()
                    } else {
                        setNameText(nameText.slice(0, -1))
                    }
                } else if (selectedField === 'translation') {
                    if (translationText.length === 0) {
                        handleFieldSelect('name')
                    } else {
                        setTranslationText(translationText.slice(0, -1))

                    }
                }
            }
        }
    };

    let [wordAdderOpacity, setWordAdderOpacity] = useState(0)

    return (
        <div
            style={{
                marginBottom: 5,
            }}
        >
            <div
                onClick={() => clickWord()}
            >
                <div style={{
                    display: "flex",
                }}
                >
                    <WordNameField
                        text={nameText}
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
                    text={translationText}
                    isSelected={isSelected && selectedField === "translation"}
                    handleFieldSelect={handleFieldSelect}
                />
            </div>
            <div
                onMouseEnter={() => setWordAdderOpacity(1)}
                onMouseLeave={() => setWordAdderOpacity(0)}
                onClick={() => {
                    addAndSelectWord()
                }}
                style={{
                    backgroundColor: "whitesmoke",
                    height: "10px",
                    width: "15%",
                    opacity: wordAdderOpacity,
                }}>

            </div>
        </div>
    )
}


const Words = props => {

    let {
        words,
        tags,
        addWord,
        selectedWord,
        handleSelectWord,
        handleDesselectWord,
        deleteWord,
    } = props;

    let [wordAdderOpacity, setWordAdderOpacity] = useState(0)

    return (
        <>
            <div
                onMouseEnter={() => setWordAdderOpacity(1)}
                onMouseLeave={() => setWordAdderOpacity(0)}
                onClick={() => {
                    addWord(0)
                    handleSelectWord(0)
                }}
                style={{
                    backgroundColor: "whitesmoke",
                    height: "10px",
                    width: "15%",
                    cursor: "pointer",
                    opacity: wordAdderOpacity,
                    marginBottom: 2,
                }}>

            </div>
            {words.map((word, id) => {
                return (
                    <>
                        <Word
                            id={id}
                            word={word}
                            allTags={tags}
                            isSelected={selectedWord === id}
                            handleSelectWord={handleSelectWord}
                            handleDesselectWord={handleDesselectWord}
                            addWord={addWord}
                            deleteWord={deleteWord}
                        />
                    </>

                )
            })}
        </>
    )
}

export default Words