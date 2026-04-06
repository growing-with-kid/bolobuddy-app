export type SystemStory = {
  title: string
  mood: 'bedtime' | 'kindness' | 'courage' | 'nature' | 'mythology'
  language: 'english' | 'hindi' | 'hinglish'
  age_min: number
  age_max: number
  seed_batch: string // always 'march-2026-v1'
  content: string // full story text with [child_name] placeholder
}

export const SYSTEM_STORIES: SystemStory[] = [
  // ── BEDTIME ─────────────────────────────────────────────────────────

  {
    title: 'The Moonlit River and the Little Fish',
    mood: 'bedtime',
    language: 'english',
    age_min: 3,
    age_max: 4,
    seed_batch: 'march-2026-v1',
    content: `
The moon came out tonight, [child_name]…

It was big and round, like a roti fresh from the fire.
It hung low over the river.
And the river was quiet.
So quiet you could almost hear the stars blinking…

In that river, there lived a little fish.
Her name was Meenu.
She was small, and soft, and silver.
Like a raindrop with fins.

Every night, Meenu would swim to the same spot.
Right in the middle of the river.
Where the moonlight touched the water.
She liked it there.
It felt warm.
Even though water is cool.

Meenu would float.
Just float.
Let the river carry her, slowly…

Tonight, she looked up at the moon.
"Are you going to sleep too?" she asked.
The moon didn't answer.
But it glowed a little brighter.
As if to say, yes.

Meenu smiled her little fish smile.
And she let her tail stop moving.
And she drifted…
Left… then right…
Left… then right…

The reeds on the bank rustled softly.
The frogs had stopped croaking.
Even the river seemed to take a slow, deep breath…

And [child_name]… you know something?
That is exactly how it feels when it is time to rest.
You just let go.
Like Meenu.
You stop swimming.
And you float.

The moonlight is here too, [child_name].
Right outside.
The same moon that watches over Meenu…
is watching over you.

Let your arms go soft.
Let your legs go heavy.
The world is very quiet now.

And little Meenu…
She is sleeping.
Rocked by the river.
Covered in silver light.

And you, [child_name]…
You are resting too.
Safe.
Warm.
Home.

Sleep now… sleep now…
`,
  },

  {
    title: 'Chanda Mama Aata Hai',
    mood: 'bedtime',
    language: 'hindi',
    age_min: 3,
    age_max: 4,
    seed_batch: 'march-2026-v1',
    content: `
[child_name]… aaj raat Chanda Mama aa rahe hain.

Dhheere dhheere… oopar aasman mein.
Jaise koi pyaara mehmaan door se aata hai.
Pair tiptoeing karte hue.
Taaki koi jaage na.

Chanda Mama ke paas ek jholi hai.
Naaram si… chamkili si.
Usme woh neend bharte hain.
Har raat.
Sabke liye.

Chiriyon ke liye.
Phoolon ke liye.
Chhote bacchon ke liye.

[child_name] ke liye bhi.

Aaj Chanda Mama chal ke aa rahe hain tere paas.
Woh jaante hain tu kahan reh-ta/reh-ti hai.
Woh teri chhat dekhte hain roz.
Aur muskurate hain.

Dhheere se woh jholi kholte hain…
Aur teri aankhon par halki si neend daalte hain.

Aankhein bhaari ho rahi hain… [child_name]?
Haan… wahi toh Chanda Mama ki neend hai.
Tujhe chhoo rahi hai.

Sar ko takiye par tik jaane do.
Haath ko sidha chhod do.
Saanson ko aaram se aane do… jaane do…

Bahar aasman mein Chanda Mama abhi bhi hain.
Tere saath.
Raat bhar.

Woh kahin nahin jaayenge.
Woh rukte hain… jab tak tu so na jaaye.

[child_name]… ab aankhen band karo.
Neend aa rahi hai…
Pyaari si… halki si…
Bilkul Chanda Mama ki tarah.

So jao…
So jao…
`,
  },

  {
    title: 'Sone Do, Tara',
    mood: 'bedtime',
    language: 'hinglish',
    age_min: 5,
    age_max: 6,
    seed_batch: 'march-2026-v1',
    content: `
Aaj raat, [child_name]… ek tara jaagna bhool gaya.

Sab taare so gaye the.
Aasman bilkul dark tha.
Aur woh ek tara… woh abhi bhi blink kar raha tha.

Uska naam tha Tara.

Tara ko neend nahin aa rahi thi.
Because woh sochta tha — "agar main so gaya, toh duniya kaun dekhega?"

Toh woh jaaga raha.
Blink karta raha.
Thakta raha.

Phir ek purana tara aaya.
Woh bada tha. Thoda dimm. Lekin bahut shaant.

"Tara," usne kaha… "beta, so jao."

"Lekin duniya…" Tara ne kaha.

"Duniya theek hai," bade tare ne kaha.
"Woh tumhara wait nahin karti. Woh bhi so rahi hai."

Tara ne neeche dekha.
Sach mein… sab so rahe the.
Gaon so raha tha.
Sheher so raha tha.
[child_name] bhi… almost so raha/rahi tha/thi.

Tara thoda ruka.
Phir usne ek gehri saans li.
Aur… slowly… uski roshni thodi thodi kam hui.

Dim… aur dim… aur dim…

Aur woh so gaya.

Aasman ab bilkul shaant tha.
Sab taare so rahe the.
Duniya so rahi thi.

Aur [child_name]…
Tu bhi so sakta/sakti hai aaj raat.
Tara ki tarah.

Aankhein band kar lo.
Koi fikar nahin.
Duniya theek hai.

So jao… [child_name]…
So jao…
`,
  },

  {
    title: 'The Night the Stars Came Down',
    mood: 'bedtime',
    language: 'english',
    age_min: 7,
    age_max: 8,
    seed_batch: 'march-2026-v1',
    content: `
There is a story that the old people tell, [child_name]…

About a night when the stars came down.

Not falling — not crashing.
Just… quietly descending.
Like petals from a jamun tree.
Soft and slow and purple.

They came to rest in the fields outside the village.
Tiny lights, each one.
Glowing among the wheat.
The farmers found them in the morning.
Small silver seeds that were already gone by sunrise.

But on that night… the night they came down…
One child saw them.

She was awake when she shouldn't have been.
Looking out her window, the way children do.
When the world feels too interesting to sleep.

She watched them fall.
She counted them under her breath.
One… two… seven… twelve…

Then one landed on her windowsill.

It was no bigger than a firefly.
But it was warm.
And it pulsed, slowly.
Like a heartbeat.

The girl put her hand near it — not touching.
Just near.
And the light seemed to breathe a little deeper.

Then it rose.
Lifted off the windowsill.
Drifted back up into the dark.

Back to where it belonged.

The girl watched it go.
And something about watching it find its place…
made her feel like she had found her place too.

She pulled her blanket up.
She let her body sink into her mattress.
The night was very still.

[child_name]… that feeling the girl had?
That feeling of belonging right where you are…
That is what nighttime is for.

You are exactly where you should be.
In your bed.
In your home.
Safe.

Close your eyes now.
The stars are back in their places.
And so are you.

Sleep, [child_name]…
Sleep well.
`,
  },

  // ── MYTHOLOGY ────────────────────────────────────────────────────────

  {
    title: 'Ganesha and the Moonlit Race',
    mood: 'mythology',
    language: 'english',
    age_min: 5,
    age_max: 6,
    seed_batch: 'march-2026-v1',
    content: `
Long ago, [child_name]… on a night when the moon was very full…

Ganesha and his brother Kartikeya had a race.

Their father Shiva said — "Whoever circles the world first wins."

Kartikeya laughed.
He jumped on his peacock.
His peacock spread its great feathers.
And they flew off — fast as the wind, fast as lightning.

Ganesha watched his brother go.

Then he looked at his own vehicle.
His mouse.
A small, round, quiet mouse.
Named Mushika.

Mushika looked up at Ganesha.
Ganesha looked down at Mushika.
And Ganesha smiled.

He knew something.

He walked slowly to where his mother Parvati stood.
He walked slowly to where his father Shiva stood.
And he walked in a circle around them.
Once.

Then he bowed.

"You are my whole world," Ganesha said.
"I have circled the world."

Shiva was quiet for a moment.
Parvati smiled.
And then Shiva nodded.

"You are right," he said. "You win."

When Kartikeya returned — breathless, feathers ruffled — Ganesha was already eating his favourite modak.
Peaceful.
Unbothered.
Happy.

[child_name]… Ganesha did not rush.
He did not panic.
He thought carefully.
And he found that everything he needed… was already right there.

Just like you, tonight.
Everything you need is right here.
Your bed.
Your home.
Your family — your whole world.

Let Ganesha's quiet happiness settle over you now.
Close your eyes.
Rest like Ganesha rested.
Still. Calm. Full.

Sleep, [child_name]…
`,
  },

  {
    title: 'Hanuman Ki Neend',
    mood: 'mythology',
    language: 'hindi',
    age_min: 5,
    age_max: 6,
    seed_batch: 'march-2026-v1',
    content: `
[child_name]… kya tujhe pata hai?

Hanuman ji bhi kabhi kabhi thak jaate the.

Bahut badi ladaaiyan ladte the woh.
Pahaad uthate the.
Samundar paar karte the.
Sab ki madad karte the.

Aur jab raat aati thi…
Tab woh ek bade peepal ke ped ke neeche baithte the.

Aankhein band kar lete the.

Haath gode mein rakh lete the.
Aur muskurate the.

Kyunki unke dil mein Ram naam tha.
Aur Ram naam… woh ek gehri neend ki tarah hai.
Shaant.
Garam.
Surakshit.

[child_name], Hanuman ji uss raat so gaye the.
Taaon ke saaye mein.
Sitaaron ki roshni mein.
Ram ka naam hothon par lete hue.

Unhe pata tha — kal bhi kaam hoga.
Par abhi… abhi sirf aaraam tha.

Aur aaraam karna… woh bhi toh ek kaam hai.
Bahut zaroori kaam.

Tujhe bhi aaj bahut kuch kiya, [child_name].
Khela.
Seekha.
Soocha.

Ab tera kaam ho gaya.

Aankhein band kar.
Haath sidhe chhod de.
Saanson ko aane jaane de…

[child_name]… Hanuman ji ki tarah…
Neend aa rahi hai tere paas.
Pyaari si.
Naram si.

So ja…
So ja…
`,
  },

  {
    title: 'The Tortoise Who Touched the Sky',
    mood: 'mythology',
    language: 'hinglish',
    age_min: 7,
    age_max: 8,
    seed_batch: 'march-2026-v1',
    content: `
[child_name], yeh story hai ek kachhua ki.

Bahut purani baat hai.
Jab sky aur earth abhi bhi mile hue the.
Jab trees itne bade the ke unki chhaon ek poore gaon ko dhak leti thi.

Us zamane mein ek kachhua tha.
Uska naam tha Kurma.

Baaki sab animals bahut fast the.
Hiran. Ghoda. Sherni.
Woh sab daud ke aasman ko chhoona chahte the.
Par woh kabhi pahunch nahi paye.
Aasman bahut oopar tha.

Kurma ne kuch nahin kaha.
Woh bas chalta raha.
Dhheere dhheere.
Roz thoda aur.
Kabhi ruka nahin.
Kabhi hurry nahin ki.

Seasons aaye. Seasons gaye.
Baaki animals ne give up kar diya.
Kurma chalta raha.

Aur phir ek din…
Bahut gehri raat thi.
Stars bahut paas lag rahe the.

Kurma ne upar dekha.
Aur ek star ne uski naakon ko chhoo liya.

Bas ek second ke liye.
Par woh enough tha.

Woh vaapas aaya.
Apne ghole mein ghus gaya.
Aur so gaya.

Uske face par ek choti si smile thi.

[child_name]… Kurma ne koi bhi hurry nahin ki.
Woh simply… consistent raha.
Roz thoda aur.
Aur ultimately… woh pahunch gaya.

Aaj tu bhi bahut aage badh-ta/badh-ti ja raha/rahi hai, [child_name].
Roz thoda aur.

Ab so ja.
Kal phir ek step aur.
Dhheere dhheere… hum sab pahunch jaate hain.

So ja, [child_name]…
So ja…
`,
  },

  {
    title: "Draupadi's Garden of Stars",
    mood: 'mythology',
    language: 'english',
    age_min: 7,
    age_max: 8,
    seed_batch: 'march-2026-v1',
    content: `
This is a story that Draupadi used to tell, [child_name]…
On the nights when the forest was dark and the exile felt long.

She would gather the children of the camp.
And she would point up.

"Do you see that cluster of stars?" she would say.
"Those five bright ones?"

The children would nod.

"Those are not just stars. Those are gardens."

She told them that each star was a seed.
Planted there by someone who had loved deeply.
A mother who stayed awake all night with a sick child.
A friend who walked a long way just to say hello.
A farmer who shared his last grain.

Each act of love, she said, becomes a star.
It doesn't disappear.
It just moves… up.
Where it can give light to everyone.

The children would listen.
And somehow the forest felt less dark.
And the exile felt less hard.
And the night felt…
Like something to be grateful for.

Because the sky was full.
So full.
All those acts of love, shining.

[child_name]… tonight, look at what today held.
Someone took care of you today.
Someone gave you food.
Someone said something kind.
Maybe you did something kind too.

All of that… is up there now.
Shining.

The sky tonight is full of love.
And you are part of it.

Close your eyes.
You are safe.
You are loved.
You are enough.

Sleep, [child_name]…
Sleep.
`,
  },

  // ── KINDNESS ─────────────────────────────────────────────────────────

  {
    title: 'The Boy Who Shared His Dal',
    mood: 'kindness',
    language: 'english',
    age_min: 3,
    age_max: 4,
    seed_batch: 'march-2026-v1',
    content: `
Once there was a little boy named Rohan.

He lived in a small house, [child_name].
With a small kitchen.
And every evening, his Nani made dal.
Yellow dal.
With a little tadka — mustard seeds popping, curry leaves curling.
The smell filled the whole lane.

One evening, Rohan sat down with his bowl.
It was full.
Warm.
His favourite.

Then he looked outside.

There was a sparrow on the window ledge.
Small.
Wet from the rain.
Shivering a little.

Rohan looked at the sparrow.
The sparrow looked at Rohan.

Rohan took a small piece of roti from his plate.
And placed it on the ledge.

The sparrow hopped forward.
Looked at it.
Then ate.

It ruffled its feathers.
It looked a little warmer.

Rohan watched.
Then went back to his dal.

He didn't feel like he had lost anything.
He felt like he had gained something.
Something warm.
Sitting right in the middle of his chest.

[child_name]… that warmth Rohan felt?
That is what kindness feels like from the inside.

You have felt it too.
I know you have.
When you shared something.
When you helped someone.
When you said something gentle.

That warmth… it stays.
Even at night.
Even right now.

Feel it, [child_name].
Let it settle in your chest.
Let it make you slow and warm.

Sleep now.
Warm and kind.
Just like Rohan.
`,
  },

  {
    title: 'Dadi Ki Mithai',
    mood: 'kindness',
    language: 'hindi',
    age_min: 5,
    age_max: 6,
    seed_batch: 'march-2026-v1',
    content: `
Bahut saal pehle ki baat hai, [child_name]…

Ek gaon mein ek Dadi rehti thi.
Unka naam tha Kamla Dadi.
Aur unke haath mein ek khaas cheez thi.

Woh besan ke laddoo banati thi.
Sachchi mein behtareen laddoo.
Meethe. Khushbudar. Bilkul sahi matra mein.

Har Diwali, Kamla Dadi ke laddoo poore mohalle mein jaate the.
Padosi ke ghar.
Doodh wale uncle ke ghar.
Sweeper bhaiya ke ghar.
Sabke ghar.

Logon ne poocha — "Dadi, itna kyun karte ho? Sab toh itna nahi karte."

Dadi muskurati thi.
Aur kehti thi — "Meetha baantne se kam nahi hota. Badhta hai."

[child_name]… woh sach bol rahi thi.

Dadi ke laddoo khatam ho jaate the.
Par unki khushi khatam nahi hoti thi.
Kyunki jab woh dekhti thi ki kisi ke chehere par muskaan aai…
Toh unke andar ek naya laddoo ban jaata tha.

Dil mein.

Tujhe bhi pata hai yeh feeling, [child_name]?
Jab tune kisi ki madad ki…
Ya kuch share kiya…
Tab jo feeling aayi… woh Dadi ki mithai jaisi thi.

Woh feeling aaj raat bhi tere saath hai.

So ja ab.
Khush. Halka. Bhara hua.
Bilkul Kamla Dadi ki tarah.

So ja, [child_name]…
So ja…
`,
  },

  {
    title: 'Two Birds, One Banyan Tree',
    mood: 'kindness',
    language: 'hinglish',
    age_min: 7,
    age_max: 8,
    seed_batch: 'march-2026-v1',
    content: `
Ek purana banyan tree tha, [child_name].
Bahut bada.
Itna bada ke uski chhaon mein puri ek mohalla fit ho jaaye.

Us tree mein do parinde rehte the.
Ek ka naam tha Neela.
Doosre ka naam tha Peeloo.

Neela bahut fast tha. Bahut sharp. Woh kisi bhi cheez ko jaldi pakad leta tha.
Peeloo slow tha. Sochta tha. Decide karne mein time lagta tha.

Alag alag the. Par same tree mein rehte the.

Ek din baarish aayi — bahut zyada.
Aisi baarish jo stop hi nahi ho rahi thi.

Tree ki ek badi daali tooti.
Neela ka nest usmein tha.
Woh gir gaya.

Peeloo ne dekha.
Woh sochta raha…
Kya karun? Kaise help karun?

Phir woh slowly, carefully, neeche utara.
Apni strong beak se nest ke pieces utha ke laaya.
Ek ek karke.
Vaapas oopar ek safe jagah banai.

Bahut time laga.
Bahut mehnat ki.
Par woh ruka nahin.

Jab tak Neela ka naya nest ready nahi ho gaya…
Peeloo ne apni jagah nahi li.

Raat tak dono safe the.
Baarish ruk gayi.
Banyan tree chup tha.
Dono birds so gaye the.

[child_name]… Peeloo ne koi badi cheez nahi ki.
Woh simply… wahan tha.
Jab Neela ko zaroorat thi.

Kabhi kabhi kindness ek badi gesture nahi hoti.
Woh bas… present rehna hoti hai.

Aaj tune bhi kisi ke liye kuch kiya hoga.
Ya kisi ne tere liye kiya hoga.

Woh moment yaad kar.
Aur so ja.
Tree ki chhaon mein.
Safe.

So ja, [child_name]…
`,
  },

  // ── COURAGE ──────────────────────────────────────────────────────────

  {
    title: 'The Little Elephant Who Was Afraid',
    mood: 'courage',
    language: 'english',
    age_min: 3,
    age_max: 4,
    seed_batch: 'march-2026-v1',
    content: `
There was a little elephant, [child_name].
Her name was Moti.

Moti was small — as elephants go.
Her ears were big.
Her trunk was still learning what it was for.
And she was afraid of the river.

All the other elephants waded in.
Splash. Splosh.
They loved it.

But Moti stood at the edge.
Her feet on the mud.
The water lapping near her toes.
And she stayed there.

Her Mama came and stood beside her.
She didn't push.
She didn't say "don't be silly."
She just stood there.
Big and warm and close.

After a long time…
Moti moved one foot forward.
Into the mud at the water's edge.

It was cold.
And soft.
And not scary.

She moved the other foot.
Now both feet were in the water.

She looked at her Mama.
Her Mama smiled — the big slow elephant smile.

Moti stayed there.
Not swimming.
Just standing.
In the edge of the river.
And that was enough.

[child_name]… Moti didn't have to swim that day.
She just had to take one step.
And that one step was brave.

You are brave too.
Every time you try something that feels big…
Even if you only take one step…
That is courage.

Let that courage rest now.
It worked hard today.
It needs sleep.
Just like you.

Close your eyes, [child_name].
You are safe.
You are brave.
You are Moti, standing at the water's edge.
And it is perfectly okay.

Sleep now…
`,
  },

  {
    title: 'Arjun Ka Pehla Kadam',
    mood: 'courage',
    language: 'hindi',
    age_min: 5,
    age_max: 6,
    seed_batch: 'march-2026-v1',
    content: `
[child_name]… Arjun ek chota sa ladka tha.

Woh apni Dadi ke saath ek chhote se gaon mein rehta tha.
Kheton ke beech.
Neem ke pedh ke paas.

Arjun bahut kuch karna chahta tha.
Par ek kaam tha jo use dar lagata tha.

School mein teacher ne kaha tha — "kal sabko stage pe aana hoga."

Arjun ke pet mein titliyan aane lagi.
Raat ko neend nahi aayi.

Dadi ne dekha.
"Kya hua?" unhone poocha.

Arjun ne sab bataya.

Dadi chup rahi kuch der.
Phir boli — "Arjun, dar aana theek hai. Dar ka matlab yeh nahi ke tu nahi kar sakta. Dar ka matlab hai ke yeh tujhe important lagta hai."

Arjun ne socha.

"Kal sirf pehla kadam le. Stage tak jaana. Bas."

Agle din Arjun stage ke paas gaya.
Heart thoda fast tha.
Haath thode kaanp rahe the.

Par woh chala.
Stage tak gaya.
Khada raha.

Aur phir… bol diya apni line.

Woh bhaaga vaapas seat pe.
Aur saans liya.

Teacher ne kaha — "Shabash."

Arjun ko samajh aaya ke Dadi sahi thi.
Pehla kadam hi sabse mushkil tha.

[child_name]… tujhe bhi koi dar lagta hai kabhi kabhi.
Woh normal hai.
Woh batata hai ke kuch tujhe important lagta hai.

Par tu kar sakta/sakti hai.
Ek kadam.
Bas ek.

Aaj kal tu bhi bahut brave raha/rahi hai.

Ab so ja.
Kal ka kal dekhna.
Abhi neend le.

So ja, [child_name]…
So ja…
`,
  },

  {
    title: 'The Girl and the Mountain Path',
    mood: 'courage',
    language: 'english',
    age_min: 7,
    age_max: 8,
    seed_batch: 'march-2026-v1',
    content: `
Her name was Priya, [child_name].

She lived in a village at the base of the mountains.
The kind of mountains that have clouds halfway up.
That disappear into mist in the mornings.

Every year the villagers climbed to the old temple at the top.
A long path. Steep stones. Cold wind.

This year Priya was old enough.
Her grandfather would take her.

The morning they set off, Priya looked up.
She could not see the top.
Only rock and mist.

"Thatha," she said. "I can't see where we're going."

Her grandfather smiled.
"We never can," he said.
"You only need to see the next stone."

They walked.
When Priya got tired, they rested.
When the path turned steep, they slowed down.
When the wind cut cold across the ridge, her grandfather pulled her close.

They did not talk much.
They just kept walking.
One stone.
Then the next.
Then the next.

And then — without any warning —
The mist opened.

And there was the temple.
Old and quiet and still.
The valley below, green and far.
The sky above, clear and wide.

Priya stood there for a long time.
Not saying anything.
Just breathing.

Later, walking home, she understood.
She hadn't needed to see the top.
She just needed to keep going.

[child_name]… you are on your own mountain.
Growing. Learning. Facing things that feel steep.
You don't need to see the top tonight.
You just need to rest.

Tomorrow, one more step.
The mist will open when it's time.

Sleep now, [child_name].
You are doing so well.
So well.

Sleep.
`,
  },

  // ── NATURE ───────────────────────────────────────────────────────────

  {
    title: "The Mango Tree's Secret",
    mood: 'nature',
    language: 'english',
    age_min: 3,
    age_max: 4,
    seed_batch: 'march-2026-v1',
    content: `
Behind the house, [child_name]… there was a mango tree.

Old.
Wide.
With bark that had lines in it like a kind face.

In summer, the tree gave mangoes.
Big golden ones.
So sweet they dripped.

In the rains, it gave shade.
Cool green shade.
Where the frogs would sit.

In winter, it stood bare.
Just its branches.
Like arms reaching up.

The children of the house had grown up under this tree.
Climbed it. Read under it. Slept under it in the afternoons.

One night, the smallest child — her name was Pooja — crept outside.
She wanted to know the tree's secret.
Why was it always… so calm?
Even in the storms?

She sat at the base of the tree.
She pressed her hand against the bark.
It was cool.

She listened.

The tree didn't say anything in words.
But she felt something.
Deep roots.
That's what she felt.
Something holding on, far below the ground.
Steady and quiet.
Not going anywhere.

Pooja understood.
The tree wasn't calm because nothing shook it.
It was calm because it was rooted.

She went back inside.
She got into bed.
She thought about her own roots.
Her Nani. Her Nana.
This house. This home.

She felt them.
Holding.

[child_name]… you have roots too.
People who love you.
A home that holds you.

Feel them tonight.
Deep and steady.
Like the mango tree.

Sleep now…
Rooted.
Safe.
`,
  },

  {
    title: 'Baarish Aur Mendak',
    mood: 'nature',
    language: 'hindi',
    age_min: 5,
    age_max: 6,
    seed_batch: 'march-2026-v1',
    content: `
Aaj baarish aayi, [child_name]…

Dhheere dhheere.
Pehle ek bund.
Phir do.
Phir… trrr trrr trrr… chhat pe.

Aur jab baarish aati hai, toh mendak jaag jaate hain.

Ek chhote se talab mein, [child_name] ke ghar ke paas…
Char mendak the.

Pehle baarish ki bund talab pe padi.
Aur pehle mendak ne aawaaz di — "Trrr-unk!"

Doosre bund pe doosra mendak — "Trrr-unk!"

Phir teesra. Phir chautha.

Jaldi hi poora talab bol raha tha.
Ek bade song ki tarah.
Baarish ka welcome song.

Asmaan upar se baarish bheja raha tha.
Mendak neeche se shukriya bol rahe the.

[child_name]… kya tune kabhi sunna aisa?
Raat ko baarish ki awaaz?
Chhat pe girte paani ki awaaz?
Door se mendakon ki tarrr tarrr?

Woh sab tere liye tha.

Raat ka yeh song…
Baarish ka yeh gift…
Sirf sun-ne ke liye.
Sirf mehsoos karne ke liye.

Aankhein band kar, [child_name].
Bahar baarish hogi shayad.
Ya hawa chalegi.
Ya kuch nahin — bas raat ki shanti.

Suno usse.

Yeh sab tere liye.

So ja, [child_name]…
So ja…
`,
  },

  {
    title: 'The Cloud Who Lost Its Rain',
    mood: 'nature',
    language: 'hinglish',
    age_min: 7,
    age_max: 8,
    seed_batch: 'march-2026-v1',
    content: `
[child_name], yeh story hai ek cloud ki.

Uska naam tha Meghna.

Meghna bahut badi thi. Fluffy. Grey-white. Full of rain.
Har cloud ki tarah, uski bhi ek job thi — rain dena.

Par us din Meghna confuse ho gayi.

Woh kahan rain kare?

Neeche ek sheher tha — concrete, buildings, cars. Wahan zaroorat nahin thi.
Ek side pe pahaad the — par wahan already bahut rain hoti thi.
Doosri taraf desert tha — lekin Meghna wahan pahunch nahi sakti thi.

Meghna ruk gayi.
Mid-sky mein.
Heavy. Uncomfortable. Waiting.

Phir ek purani cloud aayi.
Experienced. Thodi si grey.

"Kya hua?" usne poocha.

Meghna ne sab bataya.

Purani cloud ne suna.
Phir boli — "Mere saath aa."

Woh dono slowly drift karke ek chhote se forest ke upar aai.
Ek aisa forest jo thoda dry tha.
Jahan trees ki pattiyan thodi murjhaayi thi.
Jahan mitti pyas se toot rahi thi.

"Yahan," purani cloud ne kaha.

Meghna ne neeche dekha.
Aur… rain dedi.

Slowly pehle. Phir properly.
Trrr trrr trrr.

Forest ki pattiyan khuli.
Mitti ne pani pi liya.
Ek chhoti si nadi phir se behne lagi.

Meghna halki ho gayi.
Bahut halki.
Jaise ek bada bojh utar gaya ho.

[child_name]… kabhi kabhi hum nahin jaante kahan help karni hai.
Lekin jab hum sahi jagah pahunch jaate hain… hum jaante hain.

Aaj tune jo bhi kiya — sahi jagah tha.
Tu sahi jagah hai.

Ab halka ho ja.
Meghna ki tarah.

So ja, [child_name]…
So ja…
`,
  },

  {
    title: 'Nani Ka Jungle',
    mood: 'nature',
    language: 'hindi',
    age_min: 3,
    age_max: 4,
    seed_batch: 'march-2026-v1',
    content: `
[child_name]… Nani ke ghar ke peeche ek chhota sa jungle tha.

Zyada bada nahi.
Bas kuch ped.
Kuch pathhar.
Ek paani ka chhota sa nala.

Par [child_name] ko woh jungle bahut pyaara lagta tha.

Subah wahan chiriya gaati thi.
Dopahar mein wahan girgitiyan dhoop sek-ti thi.
Shaam ko, jab suraj dhalta tha, peepal ke patte sone jaisa rang le lete the.

Aur raat ko?

Raat ko jungle so jaata tha.

Ped apni pattiyan rok lete the.
Chiriya apne ghonton mein ghus jaati thi.
Nala dhheere dhheere behta raha… but quietly.

Sab sone ke liye tayaar.

Ek raat [child_name] Nani ke saath bahar gaya/gayi.
Haath pakde.
Taaron ki roshni mein.

"Jungle so raha hai," [child_name] ne kaha.

Nani ne smile ki.
"Haan," unhone kaha. "Sab so rahe hain. Trees. Pakshi. Hawa."

[child_name] ne socha.
"Main bhi soon?"

Nani ne usse uthake andar liya.
Bistar pe lita diya.
Matha choom liya.

"Haan, baccha," unhone kaha. "Tum bhi."

[child_name]… ab jungle so raha hai.
Chiriya so rahi hai.
Nala so raha hai.
Nani so rahi hain.

Ab teri baari hai.

Aankhein band kar.
Ped ki chhaon mein.
Taaron ki roshni mein.

So ja, [child_name]…
So ja…
`,
  },
]

