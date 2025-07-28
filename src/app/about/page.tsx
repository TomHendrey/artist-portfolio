import Image from "next/image";

export default function About() {
    return (
        <div className="pt-16 min-h-screen bg-white">
            <div className="py-20 px-4 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Artist Photo */}
                    <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                        <Image
                            src="/images/artist-photo.jpg" // Replace with your photo
                            alt="Artist portrait"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {/* Biography */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-light mb-6 text-neutral-800">
                                About the Artist
                            </h1>

                            <div className="space-y-6 text-neutral-600 leading-relaxed">
                                <p>
                                    Your artistic journey begins here. Share your background, what
                                    drew you to art, and the pivotal moments that shaped your
                                    creative practice. This is where you connect with your audience
                                    on a personal level.
                                </p>

                                <p>
                                    Discuss your artistic philosophy, the themes you explore in your
                                    work, and what drives your creative process. What questions are
                                    you asking through your art? What conversations do you hope to
                                    start?
                                </p>

                                <p>
                                    Include your educational background, significant exhibitions, or
                                    mentors who influenced your development as an artist. Keep it
                                    engaging and authentic to your voice.
                                </p>
                            </div>
                        </div>

                        {/* Education & Exhibitions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-light mb-4 text-neutral-800">
                                    Education
                                </h3>
                                <div className="space-y-3 text-sm text-neutral-600">
                                    <div>
                                        <p className="font-medium">MFA Fine Arts</p>
                                        <p>University Name, 2020</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">BFA Painting</p>
                                        <p>Art School, 2018</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-light mb-4 text-neutral-800">
                                    Recent Exhibitions
                                </h3>
                                <div className="space-y-3 text-sm text-neutral-600">
                                    <div>
                                        <p className="font-medium">Solo Exhibition</p>
                                        <p>Gallery Name, 2024</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Group Show</p>
                                        <p>Museum Name, 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Artist Statement */}
                        <div>
                            <h3 className="text-xl font-light mb-4 text-neutral-800">
                                Artist Statement
                            </h3>
                            <div className="space-y-4 text-neutral-600 leading-relaxed text-sm bg-neutral-50 p-6">
                                <p>
                                    My work explores the intersection of memory and identity, using
                                    color and texture to create emotional landscapes that invite
                                    viewers to examine their own relationships with place and
                                    belonging.
                                </p>
                                <p>
                                    Through my practice, I aim to challenge conventional narratives
                                    and create space for nuanced conversations about contemporary
                                    life and the human experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
