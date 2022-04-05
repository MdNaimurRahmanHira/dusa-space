
//speed at which text appears and disappears
const TEXT_UPDATING_SPEED = 55

//duration of type cursor blink animation
const BLINK_ANIM_DURATION = 2400

//text array to show & loop through
const textArr = [
    "Dusa recognised as HFS Hot Vendor 🔥 2022.",
    "Dusa is the best quantum service provider.",
]

//index of the current text of the textArr that is being animated
let currentTextIndex = -1

const myText = document.querySelector(".text")
const typeCursor = document.querySelector(".cursor")

//add letter with recursion
const addLetter = (letterIndex) => {
    //if reached the end of the text stop adding letters and animate cursor blink
    if (letterIndex >= textArr[currentTextIndex].length) {
        blinkTypeCursor()
        return
    }
    setTimeout(() => {
        //logic behind adding text
        myText.textContent += textArr[currentTextIndex][letterIndex]
        //recursion: call addLetter to add the next letter in the text
        addLetter(letterIndex + 1)
    }, TEXT_UPDATING_SPEED)
}

//remove letter with recursion
const removeLetter = (letterIndex) => {
    //if removed all stop removing letters and call updateText to start animating the next text
    if (letterIndex < 0) {
        updateText()
        return
    }
    setTimeout(() => {
        //logic behind removing text with slice
        myText.textContent = textArr[currentTextIndex].slice(0, letterIndex)
        //recursion: call removeLetter to remove the previous letter in the text
        removeLetter(letterIndex - 1)
    }, TEXT_UPDATING_SPEED)
}

//blink the cursor when not updating text
const blinkTypeCursor = () => {
    //add blink by adding blink animation class from css
    typeCursor.classList.add("blinkAnim")
    setTimeout(() => {
        //stop blinking by removing blink class 
        typeCursor.classList.remove("blinkAnim")
        // call removeLetter to start removing letter
        removeLetter(textArr[currentTextIndex].length)
    }, BLINK_ANIM_DURATION)
}

const updateText = () => {
    //change current text index to switch to next text
    currentTextIndex++
    //loop back if reached the end
    if (currentTextIndex === textArr.length) {
        currentTextIndex = 0
    }
    //call addLetter
    addLetter(0)
}

//initial text update after 1 seconds
setTimeout(() => updateText(), 1000)



// fading animation on scroll start
const boxes = gsap.utils.toArray('.fadeUp');
    // Set things up
    gsap.set(boxes, {
        autoAlpha: 0,
        y: 100
    });
    boxes.forEach((box, i) => {
        // Set up your animation
        const anim = gsap.to(box, {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            paused: true
        });

        // Use callbacks to control the state of the animation
        ScrollTrigger.create({
            trigger: box,
            end: "bottom bottom",
            once: true,
            onEnter: self => {
                // If it's scrolled past, set the state
                // If it's scrolled to, play it
                self.progress === 1 ? anim.progress(1) : anim.play()
            }
        });
    });