"use client";

import { Slider, SliderSlide } from "@/components/ui/slider";
import Image from "next/image";

export function SliderExample() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Image Slider Example</h2>
      
      <Slider
        className="h-[400px] rounded-lg"
        autoplay
        autoplayDelay={5000}
        infinite
        showArrows
        showDots
        animation="slide"
        onSlideChange={(index) => console.log("Slide changed to:", index)}
      >
        <SliderSlide className="bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="text-white text-center">
            <h3 className="text-4xl font-bold mb-4">Slide 1</h3>
            <p className="text-xl">Welcome to our portfolio</p>
          </div>
        </SliderSlide>

        <SliderSlide className="bg-gradient-to-r from-green-500 to-teal-500">
          <div className="text-white text-center">
            <h3 className="text-4xl font-bold mb-4">Slide 2</h3>
            <p className="text-xl">Explore our projects</p>
          </div>
        </SliderSlide>

        <SliderSlide className="bg-gradient-to-r from-orange-500 to-red-500">
          <div className="text-white text-center">
            <h3 className="text-4xl font-bold mb-4">Slide 3</h3>
            <p className="text-xl">Get in touch with us</p>
          </div>
        </SliderSlide>
      </Slider>
    </div>
  );
}

export function ProjectSlider({ projects }: { projects: any[] }) {
  return (
    <Slider
      className="h-[500px] rounded-lg shadow-lg"
      autoplay
      autoplayDelay={4000}
      infinite
      showArrows
      showDots
      animation="fade"
    >
      {projects.map((project) => (
        <SliderSlide key={project.id} className="bg-gray-100">
          <div className="w-full h-full relative">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h3 className="text-white text-3xl font-bold mb-2">
                {project.title}
              </h3>
              <p className="text-white/90 text-lg">{project.description}</p>
            </div>
          </div>
        </SliderSlide>
      ))}
    </Slider>
  );
}

export function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
  return (
    <Slider
      className="h-[300px] bg-white rounded-lg shadow-md"
      autoplay
      autoplayDelay={6000}
      infinite
      showArrows={false}
      showDots
      animation="cross"
    >
      {testimonials.map((testimonial, index) => (
        <SliderSlide key={index} className="p-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </SliderSlide>
      ))}
    </Slider>
  );
}
