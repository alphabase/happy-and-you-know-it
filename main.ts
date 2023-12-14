let waitForClaps = false
let claps = 0

music.setVolume(60)
startNewRound()

// Reset application
function startNewRound() {
    basic.clearScreen()
    claps = 0
}

// Function to generate a random pattern on leds over a set range
function generateRandomLeds(xRange: number, yRange: number) {
    for (let x = 0; x <= xRange - 1; x++) {
        for (let y = 0; y <= yRange - 1; y++) {
            if (randint(0, 1) == 1) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    startNewRound()
    playTone(262, BeatFraction.Eighth)
    playTone(262, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(330, BeatFraction.Eighth)
    playTone(349, BeatFraction.Eighth)
    playTone(392, BeatFraction.Eighth)
    waitForClaps = true
})

function playTone(tone: number, beat: BeatFraction) {
    generateRandomLeds(5, 5)
    music.play(music.tonePlayable(tone, music.beat(beat)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(beat))
}

basic.forever(function () {
    if (waitForClaps) {
        led.plotBarGraph(
            input.soundLevel(),
            255
        )
        input.onSound(DetectedSound.Loud, function () {
            if (waitForClaps && claps <= 1) {
                claps++
            }
            if (claps == 2) {
                waitForClaps = false
                basic.showIcon(IconNames.Heart)
            }
        })
    }
})