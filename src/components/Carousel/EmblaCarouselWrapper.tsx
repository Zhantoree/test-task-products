import {getReviews} from "@/api/reviewAPI";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/components/Carousel/EmblaCarousel";
import React from "react";

export default async function EmblaCarouselWrapper() {
    const reviews = await getReviews()
    const OPTIONS: EmblaOptionsType = {loop: true}

    return <EmblaCarousel options={OPTIONS} reviews={reviews}/>
}