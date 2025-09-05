import { Poppins, Noto_Sans, Lato, Inter, Roboto, Nunito } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700']
})

const noto_sans = Noto_Sans({
    subsets: ['latin'],
    weight: ['100', '400', '700']
})

const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '400', '700']
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['100', '400', '700']
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '400', '700']
})

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '700', '900']
})


export { poppins, noto_sans, lato, inter, roboto, nunito }