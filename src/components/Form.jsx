import React from "react";

export default function Form(){
    const [allMemeImages, setAllMemeImages] = React.useState([]);
    const [memeImage, setMemeImage] = React.useState({
        topText:"", 
        bottomText:"", 
        randomImage:"http://i.imgflip.com/1bij.jpg"
    });

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        setMemeImage({...allMemeImages, randomImage: allMemeImages[randomNumber].url})
    }

    function handleChange(e){
        const {name, value} = e.target
        setMemeImage(prevState=>{
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    React.useEffect(()=>{
        async function getMemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemeImages(data.data.memes)

            console.log("Yeni memeler geldi!")
        }
        getMemes()
    },[])
    
    return (
        <main>
            <div className="form">
                <div className="form-inputs">
                    <input 
                    type="text" 
                    name="topText" 
                    placeholder="Top text"
                    onChange={handleChange}
                    value={memeImage.topText || ""}
                    />
                    <input 
                    type="text" 
                    name="bottomText" 
                    placeholder="Bottom text"
                    onChange={handleChange}
                    value={memeImage.bottomText || ""}
                    />
                </div>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
                <div className="meme">
                    <img src={memeImage.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{memeImage.topText}</h2>
                    <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
                </div>
            </div>
        </main>
    )
}