'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CtaSection from '@/components/Layout/CtaSection';
import Reveal from '@/components/Layout/Reveal';

const paragraphs: string[] = [
  'In a perfect world, every aerospace composite job on every aerospace composite shop floor would be well within the capabilities of an average worker on an average day. So how did we get ourselves into a situation where almost every major new program is suffering from serious manufacturing and quality issues? It could be argued that we have to “push the limits” on new programs, because that is the only way advances in technology and performance are made. But how do you know when you have pushed too far?',
  'I started my career in Aerospace many years ago, working for the marketing department of a very large and well known manufacturer. Sales and marketing management always used to say that their most effective sales technique was to promise customers the “impossible”. We would write proposals offering cost, weight and performance that pushed well beyond the limits of current technology. More often than not, our customers went for this and awarded us the business. Fast forward 6 months or a year into the program. My previous employer was not delivering as (optimistically) promised, but by then the customer was so far into the program it was usually too late to re-source. Our management then used to joke that the customer was “pregnant” with us. What followed were the inevitable schedule slips and cost overruns.',
  'I place blame for the sorry state of many important new aerospace programs on over-aggressive sales and marketing. You can’t really blame these folks. They are graded on winning new business and they are going to do what they have to. Lets examine a common scenario in aerospace composite manufacturing. Design engineering at your customer creates a large part and specifies machine part tolerances. A reasonable dimensional tolerance for large composite parts is +/- 1.0 mm, or about +/- 0.040”. Your customer is asking for dimensional tolerances of +/- 0.25mm, or around +/- 0.010”. Composite parts are made of resins and fibers. Fibers have a dimensional tolerance range and resin contents have a tolerance range. It is possible for these tolerances to “stack up”, making large parts difficult or impossible to build “to print”. Supply chain issues can only add to these difficulties. Your choices:',
  '1. Advise the customer that his tolerance requirements are going to be very difficult to maintain and ask for larger tolerances. You might even quote variable pricing based on a relaxation in tolerance requirements in order to provide incentive for the change.',
  '2. Bid the job as is and worry about manufacturing and quality problems later.',
  'Evaluating bid #1 above requires additional effort on the part of the customer, with a very real risk that your proposal will be thrown out as non-responsive. Evaluating bid #2 above is easy, all the customer contracts department has to do is compare pricing amongst bidders. The ironic part of this “competition” is that the customer is eliminating actual manufacturing expertise from the award formula and adding risk. The most skilled vendor with the most “real world” manufacturing expertise will always lose out to a low cost “build to print shop”, or some kind of crazy new (unproven) tooling and manufacturing process. Always a recipe for disaster.',
  'By now everyone should see where I am going with these arguments. Sticking with established, reliable vendors and tooling and manufacturing techniques would go a long way towards reducing the endemic problems we are seeing in the aerospace composites industry right now. You get nothing for free. You either pay for the tooling and manufacturing expertise up front, or the lack thereof will haunt your program until its dying day.',
];

const BusinessDevelopmentPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ py: { xs: '30px', sm: '70px' } }}>
        <Container>
          <Reveal delay={200} shift sx={{ maxWidth: 820, mx: 'auto' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontSize: '18px', fontWeight: 600, mb: 3, lineHeight: 1.5 }}
            >
              Setting Unrealistic Expectations In A Composite Manufacturing Environment
            </Typography>
            {paragraphs.map((p, i) => (
              <Typography key={i} sx={{ mb: 2.5, lineHeight: 1.7 }}>
                {p}
              </Typography>
            ))}
          </Reveal>
        </Container>
      </Box>

      <CtaSection
        heading="Steve Zeller has over 40 years aerospace manufacturing experience and is honored and privileged to have worked with many of the “old timers” who built our industry up from scratch. The list would be way too long to print here. He is President of Southbrook Technologies."
        buttonLabel="Contact"
      />
    </Box>
  );
};

export default BusinessDevelopmentPage;
