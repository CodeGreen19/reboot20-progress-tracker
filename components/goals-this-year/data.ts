type TaskTitle =
  | "Skill"
  | "Achievement"
  | "Sacrifice"
  | "Habit"
  | "Body"
  | "Soul"
  | "Mind"
  | "Finance"
  | "Parents";

type ThisYearGoalType = {
  title: TaskTitle;
  color: string;
  tasks: string[];
  avoid: string[];
};

export const thisYearGoalData: ThisYearGoalType[] = [
  {
    title: "Achievement",
    tasks: [
      "Complete Dest Setup (need 6k dollars)",
      "Cooking setup for my mother (need 1k dollars)",
      "Send my father to Macca (need 1k dollars)",
      "Buy motorcycle (need 2k dollars)",
      "70 kg weights",
      "Six pack abs",
      "total 15k dollars",
    ],
    avoid: ["Procastinating", "Laziness", "Wasting Time"],
    color: "text-yellow-500",
  },
  {
    title: "Sacrifice",
    tasks: [
      "i will never play a single game",
      "taking any harmful food that my harm my body",
      "taking soft drinks or beverage",
      "taking sweets",
    ],
    avoid: ["Every harmful things"],
    color: "text-yellow-500",
  },
  {
    title: "Habit",
    tasks: [
      "never masterbate",
      "never masterbate again",
      "never masterbate even a single time",
      "be quite",
      "speak confidently",
    ],
    avoid: ["Procastinating", "Laziness", "Wasting Time"],
    color: "text-yellow-500",
  },
  {
    title: "Body",
    tasks: [
      "Exercise for 30 minutes every day",
      "Drink 8 glasses of water daily",
      "Maintain a balanced diet with more vegetables",
      "Focus on strength training thrice a week",
      "Track daily steps to reach 10,000",
    ],
    avoid: [
      "Skipping meals",
      "Consuming sugary beverages",
      "Overeating during late hours",
      "Sitting for long periods without movement",
    ],
    color: "text-blue-500",
  },
  {
    title: "Soul",
    tasks: [
      "Pray 5 times",
      "Don't watch single shameless video",
      "Practice gratitude every single day",
      "Read Quran 4 page daily",
      "Spend time in nature to reflect",
    ],
    avoid: [
      "Holding grudges or resentment",
      "Indulging in negativity or gossip",
      "Skipping moments of silence or reflection",
      "Engaging in activities that harm inner peace",
    ],
    color: "text-purple-500",
  },
  {
    title: "Mind",
    tasks: [
      "Learn new skills",
      "Read self development books",
      "learn learn think learn think learn learn",
    ],
    avoid: [
      "Consuming irrelevant or negative information",
      "Multitasking excessively",
      "Skipping time for mental relaxation",
      "Using gadgets mindlessly for hours",
    ],
    color: "text-red-500",
  },
  {
    title: "Finance",
    tasks: ["Financial freedom"],
    avoid: [
      "Overspending on unnecessary items",
      "Taking on avoidable debt",
      "Ignoring financial goals or plans",
      "Postponing monthly savings",
    ],
    color: "text-sky-500",
  },
  {
    title: "Parents",
    tasks: [
      "before making their live easy i will never stop",
      "Support parents with their tasks and errands",
      "Spend time listening to their stories or needs",
    ],
    avoid: [
      "Ignoring their advice or suggestions",
      "Raising your voice in disagreements",
      "Neglecting their emotional or physical needs",
      "Taking them for granted in daily life",
    ],
    color: "text-green-500",
  },
];
