# Banksy
A personal accountant that insults you!

## Motivation
Banksy is a project that manifested from my dissatisfaction with the current budgeting tools available. I used to use mint, but the tools are rather rigid and don't map perfectly to my spending habits, leading to inconsistencies in the budgeting process. In addition to the rigidity, it often takes multiple days for transactions to be uploaded. By that point I often would struggle to even remember what I had bought.

Initially my plan was to build an iOS app that used the Capital One (my current credit card provider) API to give me push notifications so that I could immediately label and categorize my expenses. However, after submitting a form requesting an API key to access **my own financial data** Capital One never responded. As ridiculous as that is, it pushed me to realize that even that solution would have fallen short.

Often I'll pay friends for things over venmo, and need to use cash for some purchases. These would not have been included in the API solution, so I realized that the only way to track all of my expenses across all mediums of payment is to use myself as a source of truth.

## Final Solution
Banksy is going to be built on top of Twilio. Every time I spend money, I'm going to text Banksy the amount I spent alongside the category and optionally a description. This is a rather high demand on the user, but I'm the only user and that effort is worth having a clear view of all my finances.

## Why does Banksy swear at me?
Sometimes you need somebody to tell you to get your shit together, especially
regarding your finances. Anytime I deviate from my budgets Banksy will attempt
to make me feel bad about myself. Tough love!
