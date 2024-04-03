## 🎉 Intro

**`✅ This is a developer portfolio & blog project made with create-next-app ✅`** 

Hey, there! I'm Seungmin Lee and I gotta say, I realized i need a new dev portfolio along with a tool to share my knowledge with others.
This project? it’s where my code meets creativity, fueled by dedication 🔥, late-night munchies 🌃. 

Alright, so it didn’t take forever to build, but it’s packed with all the fun, challenges, and aha moments. 
It’s like my digital diary but in code. Every piece of it tells a story of those "Let's just try this" ideas and "Oh cool, that actually worked!" 💡

So, kick back, have a look, and enjoy the ride through my coding adventure. 
And hey, if there’s one thing I’d love for you to take away from this, it’s that I’m all in on this **`programming gig 👨💖`**. 

&nbsp; 
## ⚙️ Installation

```bash
# clone the repoistory
git clone https://github.com/vderckdeveloper/portfolio.git
```

```bash
# navigate to the project directory 
cd /your-project-route
```

```bash
# install dependencies
npm install
```

&nbsp; 
## 🚀 Start

Run the server:

```bash
# development mode
npm run dev
```

```bash
# production mode
npm run start
```

```bash
# pm2 start mode
pm2 start ecosystem.config.js
```

&nbsp; 
## 📁 Folder Structure

```bash
│  .env.development                  // environment variable - development mode 
│  .env.production                   // environment variable - production mode
│  .eslintrc.json                    // eslint config
│  .gitignore                        // git ignore config
│  ecosystem.config.js               // pm2 config     
│  jsconfig.json                     // js config
│  next-sitemap.config.js            // next site map config
│  next.config.js                    // next js config
│  package-lock.json                 // package lock json
│  package.json                      // package json
│  README.md                         // README.md
│  
├─es5module                          // es5 module  
├─public                             // static files
│  ├─appicon                         // app icon
│  │  ├─androidicon
│  │  ├─iosicon
│  │  ├─logo
│  │  └─windowsicon
│  │          
│  ├─fonts                           // fonts
│  └─Image                           // image
│      ├─About
│      ├─AI
│      ├─BecomeCreator
│      ├─BootCamp
│      │  └─ITBusinessEstablishment
│      ├─Class
│      │  └─Creater
│      ├─ClassReview
│      ├─Creator
│      │  ├─Main     
│      │  └─MyClass
│      │          
│      ├─Event
│      │  └─EventList
│      │      ├─BasicDiscount
│      │      └─GiveawayBenefit
│      │              
│      ├─IosInstallGuide
│      ├─KakaoSns
│      ├─Logo
│      ├─MainBanner
│      ├─Notification
│      ├─OpenGraph
│      ├─Outline
│      │  ├─EnglishEntryMrReply
│      │  ├─HtmlAnyoneCanDo
│      │  ├─JavascriptAnyoneCanDo
│      │  ├─PremierproAnyoneCanDo
│      │  ├─VietnameseBeginnerToIntermediate
│      │  ├─VietnameseEntry
│      │  └─VietnameseOPIEntry
│      ├─Payment
│      ├─Perspective
│      │  ├─AIChatbotGuideContent
│      │  ├─DeepLearningGuideContent
│      │  └─ProgrammingBusinessGuideContent
│      ├─sharedComponent
│      │  └─Cardview
│      ├─Signup
│      └─User
│              
├─sentry                            // sentry logging
│      
├─src                               // all component
│  ├─component                      // component
│  │  ├─404
│  │  ├─About
│  │  ├─Admin
│  │  │  ├─Dashboard
│  │  │  │  ├─Class
│  │  │  │  ├─ClassOutline
│  │  │  │  ├─ClassReview    
│  │  │  │  ├─ClassSuggestion   
│  │  │  │  ├─Coupon 
│  │  │  │  ├─Creator    
│  │  │  │  ├─Monitor 
│  │  │  │  ├─Overview 
│  │  │  │  ├─Payout   
│  │  │  │  ├─Promotion 
│  │  │  │  ├─SalesRevenue  
│  │  │  │  └─User 
│  │  │  ├─Login
│  │  │  └─Main   
│  │  ├─AI
│  │  ├─BootCamp
│  │  │  └─ITBusinessEstablishment
│  │  ├─Cart
│  │  ├─Class
│  │  │  ├─Announcement  
│  │  │  ├─ClassReview   
│  │  │  ├─Creater   
│  │  │  ├─Curriculum
│  │  │  ├─LearningMaterial
│  │  │  ├─Outline
│  │  │  │  ├─EnglishEntryMrReply
│  │  │  │  ├─HtmlAnyoneCanDo
│  │  │  │  ├─JavascriptAnyoneCanDo
│  │  │  │  ├─PremierproAnyoneCanDo
│  │  │  │  ├─VietnameseBeginnerToIntermediate
│  │  │  │  ├─VietnameseEntry
│  │  │  │  ├─VietnameseIntermediateToAdvanced
│  │  │  │  └─VietnameseOPIEntry
│  │  │  ├─SnsShare
│  │  │  └─Summary
│  │  ├─Contact
│  │  ├─Creator
│  │  │  ├─ForgotPassword
│  │  │  ├─Login   
│  │  │  ├─Main
│  │  │  ├─MyClass
│  │  │  ├─Notification
│  │  │  ├─PasswordReset
│  │  │  ├─Profile
│  │  │  ├─Sales
│  │  │  └─Signup
│  │  ├─CustomError
│  │  ├─Event
│  │  │  ├─BasicDiscount
│  │  │  └─GiveawayBenefit
│  │  ├─ForgotPassword
│  │  ├─Login
│  │  ├─Main
│  │  ├─MyClass
│  │  ├─Notification
│  │  ├─Offline
│  │  ├─PasswordReset
│  │  ├─payments
│  │  ├─Perspective
│  │  ├─PrivacyPolicy
│  │  ├─Profile
│  │  ├─Search
│  │  ├─Signup
│  │  ├─TermsOfService
│  │  └─WarningMessage
│  │          
│  ├─pages                        // pages
│  │  ├─about
│  │  ├─admin
│  │  │  ├─dashboard
│  │  │  └─login      
│  │  ├─api
│  │  ├─bootcamp
│  │  ├─cart
│  │  ├─class     
│  │  ├─contact
│  │  ├─creator
│  │  │  ├─forgotpassword
│  │  │  ├─login
│  │  │  ├─main
│  │  │  ├─myclass
│  │  │  ├─passwordreset
│  │  │  ├─profile
│  │  │  ├─sales
│  │  │  └─signup
│  │  ├─event
│  │  │  ├─basicdiscount
│  │  │  └─giveawaybenefit
│  │  ├─forgotpassword
│  │  ├─login  
│  │  ├─myclass
│  │  ├─passwordreset
│  │  ├─payments
│  │  ├─perspective
│  │  ├─privacypolicy
│  │  ├─profile
│  │  ├─search
│  │  ├─signup
│  │  ├─sitemap
│  │  └─termsofservice
│  │          
│  ├─redux                         // redux state management
│  │      
│  ├─shardComponentStyles          // shared component 
│  │  ├─Accordian
│  │  ├─Block
│  │  ├─BootCamp
│  │  ├─Cardview  
│  │  └─Caution
│  │          
│  ├─sharedComponent               // shared component styles 
│  │  ├─Accordian
│  │  ├─Block
│  │  ├─BootCamp
│  │  ├─Cardview
│  │  └─Caution
│  │          
│  ├─styles                        // styles
│  │  ├─404
│  │  ├─About
│  │  ├─Admin
│  │  │  ├─Dashboard
│  │  │  │  ├─Class
│  │  │  │  ├─ClassOutline
│  │  │  │  ├─ClassReview
│  │  │  │  ├─ClassSuggestion
│  │  │  │  ├─Coupon
│  │  │  │  ├─Creator 
│  │  │  │  ├─Monitor   
│  │  │  │  ├─Overview  
│  │  │  │  ├─Payout  
│  │  │  │  ├─Promotion    
│  │  │  │  ├─SalesRevenue   
│  │  │  │  └─User   
│  │  │  ├─Login
│  │  │  └─Main   
│  │  ├─AI 
│  │  ├─BootCamp
│  │  ├─Cart
│  │  ├─Class
│  │  │  ├─Announcement
│  │  │  ├─ClassReview
│  │  │  ├─Creater
│  │  │  ├─Curriculum
│  │  │  ├─LearningMaterial
│  │  │  ├─Outline
│  │  │  │  └─EnglishEntryMrReply
│  │  │  ├─SnsShare
│  │  │  └─Summary
│  │  ├─Contact
│  │  ├─Creator
│  │  │  ├─ForgotPassword
│  │  │  ├─Login
│  │  │  ├─Main
│  │  │  ├─MyClass
│  │  │  ├─Notification
│  │  │  ├─PasswordReset
│  │  │  ├─Profile
│  │  │  ├─Sales
│  │  │  └─Signup
│  │  ├─CustomError
│  │  ├─Event
│  │  │  ├─BasicDiscount
│  │  │  └─GiveawayBenefit
│  │  ├─ForgotPassword
│  │  ├─Login
│  │  ├─Main
│  │  ├─MyClass
│  │  ├─Notification
│  │  ├─Offline
│  │  ├─PasswordReset
│  │  ├─payments
│  │  ├─Perspective
│  │  ├─PrivacyPolicy
│  │  ├─Profile
│  │  ├─Search
│  │  ├─Signup
│  │  ├─TermsOfService
│  │  └─WarningMessage
│  └─worker                         // background worker - progressive web application
└─utils                             // utility function
```

&nbsp; 
## 🌐 OFFICAL WEBSITE (TBA)

Link below will be updated later 
Open [https://seungminleeportfolio.com](https://seungminleeportfolio.com)

&nbsp; 
## 🔒 LICENSE

- This project and all of its contents are the sole property of **`SEUNGMIN LEE`**.
- The software is provided as-is without warranty of any kind, express or implied. 
- No license is granted for reuse, modification, distribution, or commercial use by other parties without explicit written permission from **`SEUNGMIN LEE`**.
- This project is proprietary software intended exclusively for use by **`SEUNGMIN LEE`**, and any access, use, modification, or distribution by anyone other than **`SEUNGMIN LEE`** is strictly prohibited.
- For any inquiries regarding the use, distribution, or modification of this project, please contact **`SEUNGMIN LEE`**.

&nbsp; 
## 📞 CONTACT

**`SEUNGMIN LEE`**

- **📩 Email**: [vderckdeveloper@gmail.com](mailto:vderckdeveloper@gmail.com)
- **📱 Phone**: +82 010 7303 5185 