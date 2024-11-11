document.addEventListener('DOMContentLoaded', async () => {

    try {
        const elementId = document.getElementById(await getValueFromKey('navigation'))
        const data = await loadJSON()

        data.routes.forEach(route => {
            const link = document.createElement('a')
            link.href = route.entryPoint
            link.textContent = route.name
            elementId.appendChild(link)
        })
    } catch (err) {
        console.error('Error creating navigation: ', err)
    }

})