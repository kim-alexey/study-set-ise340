export type Letter = "A" | "B" | "C" | "D" | "E";

export type Choice = {
  letter: Letter;
  text: string;
};

export type Question = {
  id: string;
  asked: string;
  prompt: string;
  choices: Choice[];
  answer: Letter;
};

const q = (
  id: string,
  asked: string,
  prompt: string,
  answer: Letter,
  choices: Array<[Letter, string]>,
): Question => ({
  id,
  asked,
  prompt,
  answer,
  choices: choices.map(([letter, text]) => ({ letter, text })),
});

/** Verbatim class questions from the ISE 340 packet. Do not reword. */
export const QUESTIONS: Question[] = [
  q(
    "2026-11-19-0946",
    "November 19, 2026, 9:46AM",
    "Which of the following is an appropriate historical or cultural location for Project #3?",
    "A",
    [
      ["A", "Bayard Cutting Arboretum"],
      ["B", "Jones Beach"],
      ["C", "a local bowling alley"],
      ["D", "all of the above"],
    ],
  ),
  q(
    "2026-11-19-0943",
    "November 19, 2026, 9:43AM",
    "Which of the following is an appropriate historical or cultural location for Project #3?",
    "B",
    [
      ["A", "Stony Brook University"],
      ["B", "Harvard"],
      ["C", "the local elementary school"],
      ["D", "all of the above"],
    ],
  ),
  q("2026-11-19-0941", "November 19, 2026, 9:41AM", "ARG is ...", "A", [
    ["A", "Alternate Reality Game"],
    ["B", "Advanced Regulatory Group"],
    ["C", "Advanced Realtime Game"],
    ["D", "what I say when I don't know the answer to a question."],
  ]),
  q(
    "2026-11-19-0939",
    "November 19, 2026, 9:39AM",
    "AppInventor is an appropriate tool for ...",
    "A",
    [
      ["A", "creating a digital prototype of your game design"],
      ["B", "developing a finished game for wide distribution"],
      ["C", "documenting the game design process"],
      ["D", "creating finished artwork"],
    ],
  ),
  q(
    "2026-11-17-0937",
    "November 17, 2026, 9:37AM",
    'What is NOT a "core drive" in Yu-kai Chou\'s gamification framework?',
    "B",
    [
      ["A", "Avoidance"],
      ["B", "Deception"],
      ["C", "Meaning"],
      ["D", "Ownership"],
    ],
  ),
  q(
    "2026-11-17-0935",
    "November 17, 2026, 9:35AM",
    "The purpose of gamification is to ...",
    "D",
    [
      ["A", "brainwash people into doing what you want them to."],
      ["B", "make playing games more fun."],
      ["C", "increase profits."],
      ["D", "motivate people to do something they should do."],
    ],
  ),
  q("2026-11-17-0933", "November 17, 2026, 9:33AM", "Gamification is ...", "B", [
    [
      "A",
      "achieved by simply giving using badges and leader boards to reward behavior.",
    ],
    ["B", "motivating behaviors with game elements in non-game contexts."],
    ["C", "motivating behaviors by letting people play a game when a task is done."],
    ["D", "inherently insidious and evil."],
  ]),
  q(
    "2026-11-12-0936",
    "November 12, 2026, 9:36AM",
    "Regarding games and culture, it can be said that ...",
    "D",
    [
      ["A", "culture is reflected and reinforced in games."],
      ["B", "culture can be challenged by games."],
      ["C", "games are part of the culture."],
      ["D", "all of the above"],
    ],
  ),
  q(
    "2026-11-12-0934",
    "November 12, 2026, 9:34AM",
    "Culture is manifested by ...",
    "C",
    [
      ["A", "symbols and heroes"],
      ["B", "rituals and values"],
      ["C", "all of the above"],
      ["D", "none of the above"],
    ],
  ),
  q(
    "2026-11-10-0935",
    "November 10, 2026, 9:35AM",
    "Yee’s study reveals that World of Warcraft players are motivated by …",
    "D",
    [
      ["A", "achievement, in terms of becoming powerful and/or collecting rare items"],
      ["B", "socialization, in terms of connecting with friends and forming guilds"],
      ["C", "immersion, in terms of exploring and learning about the lore of the world"],
      ["D", "a combination of achievement, socialization, and immersion"],
    ],
  ),
  q(
    "2026-11-10-0932",
    "November 10, 2026, 9:32AM",
    "An example of a decision that makes a game more fun is …",
    "C",
    [
      ["A", "an arbitrary decision, which doesn't really affect the outcomes"],
      ["B", "an obvious decision, in which the consequences are clear"],
      ["C", "a dilemma, which requires careful consideration of the consequences"],
      ["D", "none: making decisions is not fun"],
    ],
  ),
  q("2026-10-29-0947", "October 29, 2026, 9:47AM", "In a symmetrical game,", "B", [
    ["A", "the game board or playing field is symmetrical"],
    ["B", "players have the exact same starting conditions"],
    ["C", "players have different starting conditions and/or objectives"],
    ["D", "the game is balanced"],
  ]),
  q(
    "2026-10-29-0944",
    "October 29, 2026, 9:44AM",
    "A game designer does NOT need to worry about balancing …",
    "D",
    [
      ["A", "skill level"],
      ["B", "player objectives"],
      ["C", "player positions"],
      ["D", "budgets"],
    ],
  ),
  q(
    "2026-10-29-0941",
    "October 29, 2026, 9:41AM",
    "A loophole disrupts the gameplay experience by …",
    "A",
    [
      ["A", "giving some players an unfair advantage"],
      ["B", "not allowing the player to continue toward the game objectives"],
      ["C", "creating situations where players argue about what the rules really are"],
      ["D", "ending the game too quickly"],
    ],
  ),
  q(
    "2026-10-29-0938",
    "October 29, 2026, 9:38AM",
    "During the Formal Details phase of prototyping, the design team should be focused on …",
    "C",
    [
      ["A", "core gameplay, basic game objects, and key procedures"],
      ["B", "prioritizing what rules are essential to the game"],
      ["C", "ensuring your game has no loopholes or dead ends"],
      ["D", "tweaking the play system to make the game more fun"],
    ],
  ),
  q("2026-10-27-0938", "October 27, 2026, 9:38AM", "The theme of a story is ...", "A", [
    ["A", "the underlying message that the author wants to convey."],
    ["B", "the type of story that it is."],
    ["C", "the type of conflict that arises in the story."],
    ["D", "not important."],
  ]),
  q(
    "2026-10-27-0935",
    "October 27, 2026, 9:35AM",
    "What is NOT a principle of good interface design in games?",
    "C",
    [
      ["A", "consistency"],
      ["B", "cluster related items"],
      ["C", "rich decoration"],
      ["D", "minimize physical stress"],
    ],
  ),
  q("2026-10-27-0933", "October 27, 2026, 9:33AM", "A control table ...", "A", [
    ["A", "lists game controls and their procedures."],
    ["B", "determines who will win the game."],
    ["C", "establishes leadership roles within the design team."],
    ["D", "lists all game controllers that were considered."],
  ]),
  q(
    "2026-10-22-0938",
    "October 22, 2026, 9:38AM",
    "If you want players to feel immersed in a 3D world, you should probably employ ...",
    "D",
    [
      ["A", "an overhead view."],
      ["B", "an isometric view."],
      ["C", "a side view."],
      ["D", "a first-person view."],
    ],
  ),
  q(
    "2026-10-22-0935",
    "October 22, 2026, 9:35AM",
    "When prototyping the game mechanics, you need to ...",
    "D",
    [
      ["A", "develop a fully functioning game."],
      [
        "B",
        "develop artwork, sound and an interface that shows someone what it looks and sounds like in the game.",
      ],
      ["C", "include an instruction screen explaining how to play the game."],
      [
        "D",
        "give playtesters something they can manipulate to get a sense of what it's like to play the game.",
      ],
    ],
  ),
  q(
    "2026-10-22-0934",
    "October 22, 2026, 9:34AM",
    "When prototyping the aesthetics, you need to ...",
    "B",
    [
      ["A", "develop a fully functioning game."],
      [
        "B",
        "develop artwork, sound and an interface that shows someone what it looks and sounds like in the game.",
      ],
      ["C", "include an instruction screen explaining how to play the game."],
      [
        "D",
        "give playtesters something they can manipulate to get a sense of what it's like to play the game.",
      ],
    ],
  ),
  q(
    "2026-10-22-0931",
    "October 22, 2026, 9:31AM",
    "A digital prototype should ...",
    "A",
    [
      ["A", "answer a question that cannot be tested with a physical prototype."],
      ["B", "be an alpha version of the finished game."],
      ["C", "take a long time to develop."],
      ["D", "show every aspect of the game, including logging in."],
    ],
  ),
  q(
    "2026-10-20-0953",
    "October 20, 2026, 9:53AM",
    "In a game, the pacing curve will ...",
    "D",
    [
      ["A", "will help your design team meet tight deadlines"],
      ["B", "always ends with a severe drop-off"],
      ["C", "generates a sequence of actions that are increasingly intense"],
      ["D", "has designed climaxes and resting places in the action to keep the player engaged"],
    ],
  ),
  q(
    "2026-10-20-0951",
    "October 20, 2026, 9:51AM",
    "With a branching story structure, the storyline in a game ...",
    "B",
    [
      ["A", "is very straightforward and predictable"],
      ["B", "varies according to the choices made by the player"],
      ["C", "always ends the same way"],
      ["D", "is about a tree"],
    ],
  ),
  q(
    "2026-10-20-0949",
    "October 20, 2026, 9:49AM",
    "Flow experience in a game comes from ...",
    "B",
    [
      ["A", "going along with whatever the other players want."],
      ["B", "balancing challenge versus ability."],
      ["C", "accepting whatever happens."],
      ["D", "always winning the game."],
    ],
  ),
  q(
    "2026-10-15-0937",
    "October 15, 2026, 9:37AM",
    "Among the stages of development, the Alpha Code is developed during the _____ phase.",
    "C",
    [
      ["A", "concept"],
      ["B", "pre-production"],
      ["C", "production"],
      ["D", "quality assurance"],
    ],
  ),
  q(
    "2026-10-15-0935",
    "October 15, 2026, 9:35AM",
    "In the iterative design process, you have the most flexibility in terms of changing your idea in the _____ phase.",
    "A",
    [
      ["A", "concept"],
      ["B", "pre-production"],
      ["C", "production"],
      ["D", "quality assurance"],
    ],
  ),
  q(
    "2026-10-15-0932",
    "October 15, 2026, 9:32AM",
    "Today, game design documents are ...",
    "B",
    [
      ["A", "created early in the design process and then never changed"],
      ["B", "started early in the design process but are constantly evolving"],
      ["C", "used primarily to sell an idea to a publisher"],
      ["D", "not really useful"],
    ],
  ),
  q(
    "2026-10-06-0937",
    "October 6, 2026, 9:37AM",
    "The purpose of the play matrix, used as a playtesting tool, is to",
    "C",
    [
      ["A", "help game designers to fine-tune their designs before development begins"],
      ["B", "determine whether the game is challenging enough"],
      ["C", "help playtesters give context to their discussions about the game system"],
      ["D", "measure how immersive the game experience is"],
    ],
  ),
  q(
    "2026-10-06-0934",
    "October 6, 2026, 9:34AM",
    "The play matrix measures what core aspects of the interactive experience?",
    "D",
    [
      ["A", "skill versus ability"],
      ["B", "skill versus chance, and competition versus collaboration"],
      ["C", "competition versus collaboration, and physical dexterity versus mental calculation"],
      ["D", "skill versus chance, and physical dexterity versus mental calculation"],
    ],
  ),
  q("2026-10-01-0940", "October 1, 2026, 9:40AM", "Paper prototypes are ...", "A", [
    ["A", "a means of testing out gameplay without investing a lot in development"],
    ["B", "mock-ups of completed products that are ready to be mass-produced"],
    ["C", "not very useful"],
    ["D", "used as a marketing tool"],
  ]),
  q("2026-10-01-0938", "October 1, 2026, 9:38AM", "Iterative design ...", "C", [
    ["A", "is a process with a clear beginning, middle, and end."],
    ["B", "produces games that are only slightly different from their predecessors."],
    ["C", "involves designing, testing, and evaluating the results of your design over and over again."],
    ["D", "is typically not used by today’s game design teams."],
  ]),
  q(
    "2026-10-01-0936",
    "October 1, 2026, 9:36AM",
    "You should create a prototype of your game ...",
    "D",
    [
      ["A", "once, at the beginning of the design process."],
      ["B", "once, when your design is finalized."],
      ["C", "once, before you have finalized the design."],
      ["D", "many times throughout the design process."],
    ],
  ),
  q(
    "2026-09-29-0935",
    "September 29, 2026, 9:35AM",
    "Google found that the most important factor in effective teamwork is ...",
    "B",
    [
      ["A", "good leadership"],
      ["B", "psychological safety"],
      ["C", "skills of team members"],
      ["D", "time spent in meetings"],
    ],
  ),
  q(
    "2026-09-29-0931",
    "September 29, 2026, 9:31AM",
    "In general, teams are successful because of ...",
    "C",
    [
      ["A", "the level of education team members have"],
      ["B", "how much they are paid"],
      ["C", "the quality of interactions between team members"],
      ["D", "having a clear and qualified leader for the team"],
    ],
  ),
  q(
    "2026-09-24-0934",
    "September 24, 2026, 9:34AM",
    "Successful brainstorming does NOT ...",
    "C",
    [
      ["A", "defer judgement."],
      ["B", "generate lots of different ideas."],
      ["C", "focus on a single great idea."],
      ["D", "allow participants to build on the ideas of others."],
    ],
  ),
  q("2026-09-24-0932", "September 24, 2026, 9:32AM", "Creativity comes from ...", "D", [
    ["A", "creative types only"],
    ["B", "competition with others"],
    ["C", "fear of failing or losing"],
    ["D", "time, space, and practice"],
  ]),
  q("2026-09-22-0941", "September 22, 2026, 9:41AM", "What is the Magic Circle?", "A", [
    ["A", "A temporary world where the rules of the game apply"],
    ["B", "The community of people who play a particular game"],
    ["C", "A circle drawn on the ground, where the game of Marbles is played"],
    ["D", "A place where people go to play Magic: The Gathering"],
    ["E", "Another name for the game design team"],
  ]),
  q(
    "2026-09-22-0939",
    "September 22, 2026, 9:39AM",
    "A negative feedback loop will ...",
    "C",
    [
      ["A", "de-stabilize the game."],
      ["B", "magnify early success."],
      ["C", "maintain an equilibrium."],
      ["D", "tell the players that they are doing badly."],
    ],
  ),
  q(
    "2026-09-22-0936",
    "September 22, 2026, 9:36AM",
    "An example of a game with open information about the game state is ...",
    "A",
    [
      ["A", "Checkers"],
      ["B", "Battleship"],
      ["C", "Poker"],
      ["D", "Uno"],
    ],
  ),
  q("2026-09-22-0933", "September 22, 2026, 9:33AM", "A system ...", "D", [
    ["A", "must be created by humans"],
    ["B", "always produces the same predictable outcomes"],
    ["C", "is, by definition, always extremely complex"],
    ["D", "is greater than the sum of its parts"],
  ]),
  q(
    "2026-09-10-0938",
    "September 10, 2026, 9:38AM",
    "The purpose of having others test your game is ...",
    "D",
    [
      ["A", "to be able to say you did it."],
      ["B", "to convince others that your solution is the best one."],
      ["C", "to get others interested in buying the product."],
      ["D", "to see if the design is achieving the desired goals."],
    ],
  ),
  q("2026-09-10-0935", "September 10, 2026, 9:35AM", "Playtesting is ...", "A", [
    ["A", "the single most important activity a designer engages in."],
    ["B", "when the design team plays the game and reviews the features."],
    ["C", "done by the quality assurance team when the design is complete."],
    ["D", "is the same as focus group testing."],
  ]),
  q(
    "2026-09-08-0939",
    "September 8, 2026, 9:39AM",
    "A puzzle is different from a game in that a puzzle ...",
    "B",
    [
      ["A", "must be fun"],
      ["B", "has a limited number of possible solutions"],
      ["C", "is only for one player"],
      ["D", "is boring"],
    ],
  ),
  q(
    "2026-09-08-0937",
    "September 8, 2026, 9:37AM",
    "A game genre that requires careful planning on the part of the player is ..",
    "B",
    [
      ["A", "action"],
      ["B", "strategy"],
      ["C", "casual"],
      ["D", "sports"],
    ],
  ),
  q(
    "2026-09-08-0933",
    "September 8, 2026, 9:33AM",
    "A game's genre is be determined by ...",
    "A",
    [
      ["A", "gameplay."],
      ["B", "the platform and controllers used."],
      ["C", "the level of realism in the graphics."],
      ["D", "the theme of the game's storyline."],
    ],
  ),
  q(
    "2026-09-03-0938",
    "September 3, 2026, 9:38AM",
    "What is the reason for using Class Question in this course?",
    "C",
    [
      ["A", "Taking attendance"],
      ["B", "Counts as a quiz grade"],
      ["C", "Preparing for the final exam"],
      ["D", "All of the above"],
    ],
  ),
  q("2026-09-03-0934", "September 3, 2026, 9:34AM", "Not all games have ...", "C", [
    ["A", "procedures"],
    ["B", "structured conflict"],
    ["C", "a story"],
    ["D", "boundaries"],
  ]),
  q("2026-09-03-0932", "September 3, 2026, 9:32AM", "Every game must have ...", "A", [
    ["A", "rules."],
    ["B", "characters."],
    ["C", "a story."],
    ["D", "a clear winner."],
  ]),
  q(
    "2026-09-01-0944",
    "September 1, 2026, 9:44AM",
    "The role of the game designer is to be, first and foremost, ...",
    "B",
    [
      ["A", "a leader for the project"],
      ["B", "an advocate for the player"],
      ["C", "an advocate for the game you have designed"],
      ["D", "on the cutting edge"],
    ],
  ),
  q(
    "2026-09-01-0940",
    "September 1, 2026, 9:40AM",
    "The most important skill that a game designer can have is ...",
    "D",
    [
      ["A", "programming"],
      ["B", "drawing"],
      ["C", "marketing"],
      ["D", "communication"],
    ],
  ),
  q(
    "2026-08-27-0931",
    "August 27, 2026, 9:31AM",
    "What is the reason for using Class Question in this course?",
    "C",
    [
      ["A", "Taking attendance"],
      ["B", "Counts as a quiz grade"],
      ["C", "Preparing for the final exam"],
      ["D", "All of the above"],
    ],
  ),
  q(
    "2026-08-25-0637",
    "August 25, 2026, 6:37AM",
    "Are you able to use Class Question?",
    "A",
    [["A", "Yes!"]],
  ),
];

export const QUESTION_COUNT = QUESTIONS.length;

const byId = new Map(QUESTIONS.map((item) => [item.id, item]));

export function questionById(id: string): Question | undefined {
  return byId.get(id);
}

export function shuffleQuestions(source: Question[] = QUESTIONS): Question[] {
  const next = source.slice();
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = next[i];
    next[i] = next[j]!;
    next[j] = swap!;
  }
  return next;
}
