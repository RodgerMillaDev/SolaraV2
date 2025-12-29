import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  { id: 1, title: "What is your service?", text: "We provide digital task solutions." },
  { id: 2, title: "How do I get paid?", text: "Payments are processed after approval." },
  { id: 3, title: "Is this remote?", text: "Yes, all tasks are done online." },
  { id: 4, title: "When can I withdraw?", text: "After reaching the minimum payout." }
];

export default function StackedFaqTest() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      // Initial state
      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          scale: 1,
          transformOrigin: "center center"
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 1,
        },
        defaults: { ease: "none" }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        // Bring current card in
        tl.to(card, {
          yPercent: 0,
          duration: 1
        });

        // Scale previous card
        tl.to(
          cards[index - 1],
          {
            scale: 0.9,
            borderRadius: "12px",
            duration: 1
          },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ height: "200vh", background: "#111" }}>
      <div ref={containerRef} className="faq-wrapper">
        {faqData.map((item, i) => (
          <div
            key={item.id}
            className="faq-card"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Inline CSS for isolation testing */}
      <style>{`
        .faq-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #1b1b1b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .faq-card {
          position: absolute;
          width: 80%;
          height: 70vh;
          background: #2a2a2a;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          will-change: transform;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .faq-card h2 {
          margin-bottom: 16px;
        }

        .faq-card p {
          width: 70%;
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
