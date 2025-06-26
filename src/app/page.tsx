import React from "react";
import EmblaCarouselWrapper from "@/components/Carousel/EmblaCarouselWrapper";
import {ProductListWrapper} from "@/components/ProductList/ProductListWrapper";


export default function Page() {
    return (
        <>
            <section className="w-full max-w-[970] mx-auto">
                <EmblaCarouselWrapper />
            </section>
            <ProductListWrapper />
        </>
    );
}
