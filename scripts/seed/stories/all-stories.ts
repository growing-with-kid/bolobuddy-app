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
The moon came out tonight, beta...

It was big and round, like a roti fresh from the fire.

It hung low over the river.

And the river was quiet...

So quiet you could almost hear the stars blinking.

In that river, there lived a little fish.

Her name was Meenu.

She was small, and soft, and silver.

Like a raindrop with fins.

Every night, Meenu would swim to the same spot.

Right in the middle of the river...

Where the moonlight touched the water.

She liked it there...

It felt warm.

Even though water is cool.

Meenu would float.

Just float.

Let the river carry her, slowly...

Tonight, she looked up at the moon.

The moon didn't answer.

But it glowed a little brighter...

As if to say, yes.

Meenu smiled her little fish smile.

And she let her tail stop moving.

And she drifted...

Left... then right...

Left... then right...

The world was very quiet now...

And beta... you are resting too.

Safe. Warm. Home.

Sleep now... sleep now...
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
आज रात... चाँद मामा बहुत खुश थे।

उन्होंने अपने सारे दोस्त बुलाए...

एक एक करके... तारे आए।

आसमान में जगमगाने लगे।

बेटा... देखो कितने सुंदर हैं।

हर तारा... एक छोटी सी रोशनी।

वो सब मिलकर... तुम्हारी रात को रोशन करते हैं।

चाँद मामा कह रहे हैं...

सो जाओ बेटा...

हम यहाँ हैं... तुम्हारे पास।

रात भर जागेंगे...

तुम्हारी रखवाली करेंगे।

आँखें बंद करो...

सो जाओ... सो जाओ।
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
आज रात... आसमान में बहुत सारे तारे थे।

सब सो गए थे...

सिर्फ एक छोटी सी तारा जाग रही थी।

उसका नाम था तारा...

तारा सोचती थी... अगर मैं सो गई... तो दुनिया कौन देखेगा?

तो वो जागती रही... थकती रही...

फिर एक बड़ा शांत तारा आया।

उसने धीरे से कहा... सो जाओ बेटा...

दुनिया ठीक है... वो भी सो रही है।

तारा ने एक गहरी सांस ली...

और धीरे धीरे... वो सो गई।

बेटा... आँखें बंद करो।

नींद आ रही है तेरे पास...

सो जा... बेटा... सो जा।
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
There is a story that the old people tell, beta...

About a night when the stars came down.

Not falling... not crashing.

Just quietly descending...

Like petals from a jamun tree.

Soft and slow and purple.

They came to rest in the fields outside the village.

Tiny lights, each one.

Glowing among the wheat.

But on that night...

One child saw them.

She was awake when she shouldn't have been.

Looking out her window...

The way children do.

One star landed on her windowsill.

It was no bigger than a firefly.

But it was warm.

And it pulsed, slowly.

Like a heartbeat.

The girl put her hand near it...

Not touching. Just near.

And the light seemed to breathe a little deeper.

Then it rose...

Lifted off the windowsill.

Drifted back up into the dark.

Back to where it belonged.

You are exactly where you should be.

In your bed. In your home. Safe.

Close your eyes now...

Sleep, beta... sleep well.
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
बेटा... क्या तुम्हें पता है?

हनुमान जी भी कभी कभी थक जाते थे।

बहुत बड़ी लड़ाइयाँ लड़ते थे वो।

पहाड़ उठाते थे... समुद्र पार करते थे।

और जब रात आती थी...

वो एक बड़े पीपल के पेड़ के नीचे बैठते थे।

आँखें बंद कर लेते थे।

हाथ गोद में रख लेते थे।

और मुस्कुराते थे।

क्यूँकि उनके दिल में राम नाम था।

और राम नाम... वो एक गहरी नींद की तरह है।

शांत। गरम। सुरक्षित।

बेटा... हनुमान जी उस रात सो गए थे।

तारों की छाँव में। सितारों की रोशनी में।

राम का नाम होठों पर लेते हुए।

तुझे भी आज बहुत कुछ किया।

अब तेरा काम हो गया।

आँखें बंद कर।

हाथ सीधे छोड़ दे।

सांसों को आने जाने दे।

बेटा... हनुमान जी की तरह...

नींद आ रही है तेरे पास।

सो जा... सो जा...
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
There was once a little tortoise, beta.

Her name was Kamla.

Kamla lived near a pond.

She was small and slow.

Her shell was brown and smooth.

Every day she looked up at the sky.

It was so high...

So blue...

So far away.

One day she thought...

What if I climbed to the top of that hill?

Maybe I could touch the sky.

Everyone laughed.

You are too slow, they said.

Your legs are too short.

But Kamla started walking.

One step...

Then another...

The sun was warm on her shell.

The grass was soft under her feet.

She walked all morning...

She walked all afternoon...

And when the sun began to set...

She reached the top.

She stretched her neck up...

As high as it would go.

And the cool evening breeze touched her face.

That is what sky feels like, she thought.

Beta... you don't have to be fast.

You just have to keep going.

Close your eyes now.

You kept going today too.

Sleep now... sleep well.
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
द्रौपदी के घर के पीछे... एक छोटा सा बगीचा था।

उसमें गेंदे के फूल थे... गुलाब थे... तुलसी थी।

हर सुबह द्रौपदी उठती...

पानी लेकर आती...

हर पौधे को प्यार से सींचती।

एक दिन उसने देखा...

एक छोटी सी कली खिल रही थी।

धीरे धीरे...

पंखुड़ी दर पंखुड़ी...

द्रौपदी बैठ गई... देखती रही।

बेटा... कभी कभी सबसे सुंदर चीज़ें...

धीरे धीरे होती हैं।

जल्दी मत करो।

आज तुमने भी कुछ नया सीखा।

कोई एक छोटी सी कली...

तुम्हारे अंदर भी खिल रही है।

आँखें बंद करो...

सो जाओ... बेटा... सो जाओ।
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
एक छोटा लड़का था... रोहन।

स्कूल में उसके पास दाल चावल था।

उसकी माँ ने प्यार से बनाया था।

खाना खाते वक्त...

उसने देखा... पास में एक बच्चा बैठा था।

उसके पास कुछ नहीं था।

रोहन ने सोचा...

और अपना आधा खाना उसे दे दिया।

उस बच्चे ने मुस्कुराया।

रोहन को भूख तो लगी...

पर दिल बहुत हल्का था।

घर आकर माँ को बताया।

माँ ने गले लगाया।

बेटा... जो देता है...

उसका दिल हमेशा भरा रहता है।

सो जा... आज तूने अच्छा किया।
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
एक दिन... दादी रसोई में थीं।

वो मिठाई बना रही थीं... गुलाब जामुन।

घर में खुशबू फैल गई...

बेटा आया... दौड़ते हुए।

दादी... मिठाई मुझे दो।

दादी मुस्कुराईं... धीरे से बोलीं।

पहले पड़ोसी के बच्चों को दो...

फिर तुम्हें मिलेगी।

बेटे ने सोचा...

और फिर ले गया... बाँट दी।

जब वो वापस आया... दादी ने गले लगाया।

जो बाँटता है बेटा... उसे और मिलता है।

बेटा सो गया... मुस्कुराते हुए।

दादी की बात दिल में लेकर।

सो जा... बेटा... सो जा।
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
In a big banyan tree, beta...

There lived two birds.

One was called Mira.

One was called Tara.

They shared the same branch.

Every morning they sang together.

Every evening they flew home together.

One day a storm came.

The wind was strong.

The rain was heavy.

Mira's nest was blown away.

She sat on the branch...

Wet and cold and quiet.

Tara didn't say anything.

She just moved closer.

And sat beside her.

Wing to wing.

Warm.

The storm passed.

In the morning, they built a new nest together.

Beta... sometimes you don't need words.

Sometimes you just need someone beside you.

You are not alone tonight.

Close your eyes.

Someone who loves you is near.

Sleep now... sleep softly.
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
There was a little elephant, beta.

Her name was Moti.

Moti was small, as elephants go.

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

She didn't say don't be silly.

She just stood there.

Big and warm and close.

After a long time...

Moti moved one foot forward.

Into the mud at the water's edge.

It was cold. And soft. And not scary.

She moved the other foot.

Now both feet were in the water.

She looked at her Mama.

Her Mama smiled...

The big slow elephant smile.

Beta... Moti didn't have to swim that day.

She just had to take one step.

And that one step was brave.

You are brave too.

Close your eyes, beta.

You are safe. You are brave.

Sleep now...
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
अर्जुन बहुत छोटा था।

स्कूल का पहला दिन था...

वो डरा हुआ था... बहुत डरा हुआ।

माँ ने हाथ थामा... धीरे से कहा।

बेटा... हर बड़ा कदम... पहले छोटा होता है।

अर्जुन ने एक कदम रखा...

फिर एक और...

क्लास में गया... बैठ गया।

एक बच्चा मुस्कुराया...

अर्जुन भी मुस्कुरा दिया।

शाम को घर आया... खुश था।

माँ... मैंने एक दोस्त बनाया।

माँ ने गले लगाया।

बेटा... हर बड़ी हिम्मत... एक छोटे कदम से शुरू होती है।

सो जा... आज तूने बहुत हिम्मत दिखाई।
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
एक छोटी लड़की थी... गौरी।

वो पहाड़ पर चढ़ना चाहती थी।

सब ने कहा... बहुत ऊँचा है।

पर गौरी ने एक कदम रखा।

फिर एक और।

रास्ता कठिन था...

पत्थर थे... मोड़ थे।

पर गौरी चलती रही।

जब वो थकती... रुक जाती।

साँस लेती... आसमान देखती।

और फिर चल देती।

शाम होते होते...

वो पहाड़ की चोटी पर थी।

नीचे पूरा गाँव दिखता था।

छोटा छोटा... सुंदर सुंदर।

बेटा... हर मुश्किल रास्ता...

कहीं न कहीं पहुँचाता है।

आज तुमने भी कोई न कोई कदम रखा।

वो कदम मायने रखता है।

आँखें बंद करो...

सो जाओ... बेटा... सो जाओ।
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
Behind Nani's house, beta...

There was an old mango tree.

It was very tall.

Its branches spread wide...

Like arms reaching out.

In summer it gave mangoes.

Sweet and yellow and dripping.

In the rains it gave shade.

In winter it stood quietly.

Just breathing.

One day a little girl asked the tree...

What is your secret?

How do you give so much?

The tree didn't answer with words.

But a leaf fell...

Slowly...

Drifting down...

Landing softly on her hand.

Beta... the tree's secret is simple.

It just keeps growing.

Quietly. Every day.

You are growing too.

Every single day.

Close your eyes now.

Let yourself rest.

So you can grow a little more tomorrow.

Sleep now... sleep well.
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
आज रात... बारिश आई।

टप... टप... टप...

छत पर... पत्तों पर... जमीन पर।

एक छोटा मेंढक बाहर आया।

उसने आसमान की तरफ देखा।

और ज़ोर से बोला... टर्र टर्र।

जैसे बारिश का शुक्रिया कर रहा हो।

बेटा... प्रकृति की आवाज़ें सुनो।

बारिश की... पत्तों की... मेंढक की।

ये सब कह रहे हैं... सो जाओ।

रात आ गई... चैन से।

आँखें बंद करो...

बारिश की आवाज़ सुनते सुनते...

सो जाओ... बेटा... सो जाओ।
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
Beta... yeh story hai ek cloud ki.

Uska naam tha Meghna.

Meghna bahut badi thi.

Full of rain...

Par us din Meghna confused ho gayi.

Woh kahan rain kare?

Phir ek purani cloud aayi.

Experienced. Thodi si grey.

Mere saath aa... usne kaha.

Woh dono slowly drift karke...

Ek chhote se forest ke upar aayi.

Jahan trees pyaasi thi.

Jahan mitti sukhi thi.

Meghna ne neeche dekha.

Aur... rain de di.

Slowly pehle.

Phir properly.

Forest ki pattiyan khuli.

Mitti ne paani piya.

Meghna halki ho gayi.

Bahut halki.

Beta... kabhi kabhi hum nahi jaante kahan help karni hai.

Lekin jab hum sahi jagah pahunch jaate hain...

Hum jaante hain.

Aaj tune jo bhi kiya... sahi tha.

Ab halka ho ja. Meghna ki tarah.

So ja... beta... so ja.
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
नानी के घर के पीछे... एक जंगल था।

छोटा सा... हरा भरा।

नानी कहती थीं... इस जंगल में परियाँ रहती हैं।

रात को... जब सब सो जाते हैं।

परियाँ निकलती हैं...

फूलों को सींचती हैं...

पत्तों पर ओस छोड़ती हैं।

बेटा... आज रात।

परियाँ तुम्हारे लिए भी आएंगी।

तुम्हारे सपनों में रंग भरेंगी।

पर वो तभी आती हैं...

जब बच्चे सो जाते हैं।

आँखें बंद करो...

परियों का इंतज़ार करो।

सो जा... बेटा... सो जा।
`,
  },
]

