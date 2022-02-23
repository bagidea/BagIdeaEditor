export const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const image: HTMLImageElement = new Image()
        image.src = URL.createObjectURL(file)

        image.onload = () => {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            canvas.width = canvas.height = 100

            const context: CanvasRenderingContext2D = canvas.getContext('2d')
            context.drawImage(image, 0, 0, 100, 100)

            canvas.toBlob(resolve, file.type)
        }

        image.onerror = reject
    })
}