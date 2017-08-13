(() => {
    const storageName = 'caged-settings'

    const defaultSources = [
        {
            name: 'cage',
            title: 'Nick Cage',
            url: 'http://placecage.com/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'giphyCage',
            title: 'Giphy Cage',
            url: 'http://placecage.com/gif/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'crazyCage',
            title: 'Crazy Nick Cage',
            url: 'http://placecage.com/c/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'hoff',
            title: 'The Hoff',
            url: 'http://place-hoff.com/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'segal',
            title: 'Steven Segal',
            url: 'http://stevensegallery.com/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'murray',
            title: 'Bill Murray',
            url: 'http://fillmurray.com/',
            method: '/',
            checked: 'checked'
        }
    ]

    let sources = []

    const getSettings = (callback) => {
        window.chrome.storage.sync.get(storageName, (results) => {
            sources = results[storageName]
            if (sources === "undefined" || sources === undefined) {
                sources = defaultSources
            }
            callback(true)
        })
    }

    const calcRand = (min, max) => {
        return Math.floor(Math.random() * max) + min
    }

    const getRandomSource = () => {
        return sources[calcRand(0, sources.length)]
    }

    const findImages = () => {
        getSettings(complete => {
            let images = document.querySelectorAll('img:not([caged])')
            if (images.length > 0) {
                let source = getRandomSource()
                let index = calcRand(0, images.length)
                if (images[index].width && images[index].height > 0) {
                    images[index].src = `${source.url}${images[index].width}${source.method}${images[index].height}`
                    images[index].setAttribute('caged', true)
                }
            }
        })
    }

    setInterval(() => findImages(), 5000);
})()