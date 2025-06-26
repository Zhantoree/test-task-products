import {axiosClient} from "@/api/axiosClient";
import {GetReviewsResponse, Review} from "@/models/review";
import sanitizeHtml from "sanitize-html";


export const getReviews = async (): Promise<GetReviewsResponse> => {
    try {
        const {data} = await axiosClient.get<Review[]>('http://o-complex.com:1337/reviews')
        return [...data, {id: 21312, text: '<h1>Hello world</h1><p>asdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdfasdfasdfsdf afasdfasdfsadf asdfasdfsa asdfasdfasdf asdfasdf</p>'}].map(review => ({
            ...review,
            text: sanitizeHtml(review.text)
        }))
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка подгрузки отзывов')
    }
}

