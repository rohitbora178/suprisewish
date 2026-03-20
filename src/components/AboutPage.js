import React from 'react';
import ImageWithFallback from './ImageWithFallback';

const AboutPage = ({ onNext }) => (
  <div className="about-page">
    <div>
      <ImageWithFallback
        className="disha-child-image"
        src="/child.jpg"
        alt="Disha"
      />
    </div>

    <h1 className="subTitle-con">More About Disha 💫</h1>

    <p>Today, I feel truly honored to speak about someone very special — my dear friend, Disha Sandeep Chopda ❤️</p>

    <p>There's also a small, funny moment that I'll always remember about how our friendship began 😊</p>

    <p>When Disha first added me on Instagram, I honestly thought she was a gay! 😄 The reason? Her bio. I completely read it wrong and misunderstood everything — and that confusion was 100% my fault 🤦‍♂️</p>

    <p>Later, when I actually got to know her, I realized how wrong I was… and we both had a good laugh about it 😂 When I told her this story, it turned into one of those light, unforgettable moments that still makes us smile ✨</p>

    <p>Sometimes, the best friendships don't start perfectly — they start with little mistakes, funny misunderstandings, and then grow into something really special 💖 And that's exactly how it began with Disha 🌸</p>

    <p>Disha is not just a name, it is a story of strength, determination, and quiet resilience 💪 At just 24 years of age, she is already walking a path that many only dream of 🌟 Currently, she is pursuing LLB along with Company Secretary studies — a combination that itself reflects her dedication, discipline, and ambition 📚</p>

    <p>Disha now lives in Shirur, but her roots are deeply connected to a small town called Khadus, where she spent her childhood at her dada-dadi's home 🏡 Those early years shaped her into the person she is today — grounded, respectful, and full of warmth 🤍</p>

    <p>From a young age, Disha has always been focused and intelligent 🧠 Coming from a Marathi medium background, she proved that language is never a barrier when determination speaks louder 💯 Her helpful nature and kind-hearted personality naturally attract people — she is someone everyone feels comfortable with 😊</p>

    <p>She is a perfect example of balance ⚖️ At home, she is a loving daughter — her mother is a homemaker, and her father is a businessman 👨‍👩‍👧 Disha stands as a strong support system for both 🤝 Whether it's helping her mother in daily work, taking care of her grandparents, or even managing her father's shop when he is not around — she handles everything with maturity beyond her age 💫</p>

    <p>And she's not just responsible — she's also independent 🚗 She drives a car confidently, cooks delicious meals 🍲, and manages responsibilities like a pro 💼 In short, she is someone who can take care of everything and everyone ❤️</p>

    <p>Disha is also deeply spiritual 🙏 Every Monday, she visits the Shiva temple at Ramling Shirur, finding peace and strength in her faith 🕉️ She also loves visiting Jain tirths, showing her connection with values and traditions 🌼</p>

    <p>But beyond all this strength and positivity, there is a side of her story that many may not see…</p>

    <p>Life hasn't always been easy for Disha 💔</p>

    <p>At a very young age, she faced a heartbreaking loss — she lost her brother 😔 He was a civil engineer, someone she admired deeply 👷‍♂️ She often says how proud she is of him and the struggles he went through 💭 Losing him was not just losing a family member — it was losing a part of herself 💔 It shook her completely.</p>

    <p>For a moment, life scattered her…</p>

    <p>But what makes Disha truly special is what she did after that 🌈</p>

    <p>She stood up again 💪</p>

    <p>With courage in her heart and tears hidden behind her smile, she chose to move forward 🙂 And as if that wasn't enough, life tested her again with another major loss 💔 Yet again, she didn't give up. She gathered herself, stood strong, and continued to spread happiness around her ✨</p>

    <p>That is Disha — even when she is hurting, she makes sure others are smiling 😊</p>

    <p>She dreams big — to become a successful Company Secretary and a lawyer ⚖️📚, and most importantly, to make her parents proud 👨‍👩‍👧💖</p>

    <p>She also dreams of traveling the world 🌍 — especially visiting Turkey 🇹🇷 one day, and creating beautiful memories with her parents while exploring new places together ✈️❤️</p>

    <p>And yes, there's one more dream — meeting her favorite cricketer, Rohit Sharma 🏏 someday. Knowing Disha, that day might not be too far away 😉✨</p>

    <p>She also has a fun and lively side 😄 She loves traveling ✈️, exploring new places 🌍, and trying new food 🍽️ Especially cheesecake 🍰 — if there's cheesecake around, you'll definitely find Disha smiling! And yes, she has a special love for Oreo chocolate 🍫</p>

    <p>And here's a fun fact — her favorite sabji is Methi 🌿 (yes, Methi! 😄). While most people make faces hearing that, Disha somehow makes it sound like a five-star dish 😆 Only she can turn something simple like Methi into a favorite!</p>

    <p>When you look at her, you see happiness, confidence, and strength 🌟 But when you truly know her, you realize — she is a warrior ⚔️ A girl who turned pain into power, loss into motivation, and challenges into stepping stones 💫</p>

    <p>Disha teaches us that life is not about how easy your journey is, but about how strong you become through your struggles 💯</p>

    <p>In the end, I just want to say —<br />Disha, you are an inspiration ❤️ Your story reminds us to never give up, to stay grounded, and to always keep moving forward no matter what life throws at us 🌈</p>

    <p>We are truly lucky to have you in our lives 🤍</p>

    <p>Thank you 🙏</p>
    <button onClick={onNext} className="next-btn">
      Share Your Thoughts →
    </button>
  </div>
);

export default AboutPage;