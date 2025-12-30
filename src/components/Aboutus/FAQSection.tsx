'use client';

import { useState } from 'react';
import Image from 'next/image';
import { faqData } from '@/api/faqData';
import downArrow from '@/assets/icons/down_arrow.svg';
import useScale from '@/hooks/useScale';

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const scale = useScale();

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section style={{ marginTop: 104 * scale }}>
            {/* HEADING */}
            <h2
                style={{
                    fontWeight: 700,
                    fontSize: 40 * scale,
                    color: '#111111',
                    textAlign: 'center',
                }}
            >
                Frequently asked questions
            </h2>

            {/* QA SECTION */}
            <div
                style={{
                    marginTop: 32 * scale,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {faqData.map((faq, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={index}
                            style={{
                                width: 1120 * scale,
                                borderTop: '1px solid #E6E6E6',
                                paddingTop: 20 * scale,
                                paddingBottom: 20 * scale,
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleFAQ(index)}
                        >
                            {/* QUESTION ROW */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 20 * scale,
                                        color: '#242424',
                                    }}
                                >
                                    {faq.question}
                                </p>

                                <Image
                                    src={downArrow}
                                    alt="arrow"
                                    width={20 * scale}
                                    height={20 * scale}
                                    style={{
                                        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.4s ease',
                                    }}
                                />
                            </div>

                            {/* ANSWER */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                                    transition: 'grid-template-rows 0.4s ease',
                                }}
                            >
                                <div style={{ overflow: 'hidden' }}>
                                    <p
                                        style={{
                                            marginTop: 16 * scale,
                                            fontWeight: 400,
                                            fontSize: 16 * scale,
                                            color: '#6A6A6A',
                                        }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
