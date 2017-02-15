// This is just some sample data so you don't have to think of your own!
// const Events = {
//   '0100':{
//     name: 'Vocal Light Music Group',
//     category: "Cultural",
//     description: 'Lorem Ipsum bleh bleh bleh',
//     location: 'Main Stage',
//     time: '10:00',
//     contact: '9108908806',
//     group_event: true
//   },
//   '0101':{
//     name: 'Vocal Light Music Group',
//     category: "Cultural",
//     description: 'Lorem Ipsum bleh bleh bleh',
//     location: 'Main Stage',
//     time: '10:00',
//     contact: '9108908806',
//     group_event: false
//   },
//   '0200':{
//     name: 'Vocal Light Music Group',
//     category: "Sports",
//     description: 'Lorem Ipsum bleh bleh bleh',
//     location: 'Main Stage',
//     time: '10:00',
//     contact: '9108908806',
//     group_event: true
//   },
//   '0201':{
//     name: 'Vocal Light Music Group',
//     category: "Sports",
//     description: 'Lorem Ipsum bleh bleh bleh',
//     location: 'Main Stage',
//     time: '10:00',
//     contact: '9108908806',
//     group_event: false
//   },
// };

const allEvents= {
    '0101': {
        name: "Instrumental",
        desc: "Western and eastern music.4+1 min.1 accomplishment allowed.unlimited entries.no backing track allowed",
        regis_confirmed: true,
        location: ' Main stage ',
        time: ' 11:00 ',
        contact: ' 7411179295 ',
        registered: false
    },
    '0102': {
        name: "Movie Clip Recreation",
        desc: "6 in team. 2-minute video clip will be provided. 5+2 minutes are given to recreate. Most comic scene will be rewarded. Content must not be vulgar",
        regis_confirmed: false,
        location: ' Main stage ',
        time: ' 12:00 ',
        contact: ' 9902643437 ',
        registered: false
    },
    '0103': {
        name: "Western Group Dance",
        desc: "6+6 in a team. 5+2 minutes are given. Carry ID card. Report 2 hours prior to the event",
        location: ' Main stage ',
        time: ' 14:00 ',
        contact: ' 9060991914 ',
        fav: false
    },
    '0104': {
        name: "Indian Group Dance",
        desc: "8+4 in a team. 5+3 minutes are given. Any theme is allowed. Report 2 hours prior to the event. Should submit a video of their prior performances",
        regis_confirmed: false,
        location: ' Main stage ',
        time: ' 14:00 ',
        contact: ' 9886080813 ',
        registered: false
    },
    '0105': {
        name: "RAMP",
        desc: "Open theme. 12+2 in a team. 6+2 minutes are given. Report 3 hours before event. Carry ID cards. Audio track to be given 1 hour before the event. No use of water, fire, pet, animal skin",
        regis_confirmed: false,
        location: ' Main stage ',
        time: ' 17:00 ',
        contact: ' 9611831671 ',
        registered: false
    },
    '0106': {
        name: "Techcharades",
        desc: "3 in a team. Tech version of Dumb Charades. 1 member mimes other 2 guess. Multiple rounds",
        regis_confirmed: false,
        location: ' Edusat hall ',
        time: ' 9:00 ',
        contact: ' 9986464852 ',
        registered: false
    },
    '0107': {
        name: "Karaoke",
        desc: "Solo event. Western instruments to be used. 5+1 minute is given. 2 rounds. 6 contestants will be shortlisted for the 2nd round",
        regis_confirmed: false,
        location: ' Edusat hall ',
        time: ' 11:00 ',
        contact: ' 8971205200 ',
        registered: false
    },
    '0108': {
        name: "Web Designing",
        desc: "2 in team. 3-hour time is given. Systems will be provided",
        regis_confirmed: false,
        location: ' EEE lab ',
        time: ' 10:00 ',
        contact: ' 9686684184 ',
        registered: false
    },
    '0109': {
        name: "Online Treasure Hunt",
        desc: "2 in a team. First round is written. Second round is on computer. Use of search engines is not allowed",
        regis_confirmed: false,
        location: ' Mech Lab ',
        time: ' 10:00 ',
        contact: ' 805062998 ',
        registered: false
    },
    '0110': {
        name: "Rangoli",
        desc: "Individual event. 1 hour is given. Colors and Rangoli powder will be provided",
        regis_confirmed: false,
        location: ' Street ',
        time: ' 9:00 ',
        contact: ' 9980764095 ',
        registered: false
    },
    '0111': {
        name: "On Spot Photography",
        desc: "Individual event. Topic is given on-spot. 2 hours time is given. Photos to be taken at the RNSIT campus. On board editing allowed (Photoshop/post-processing not allowed)",
        regis_confirmed: false,
        location: ' Street ',
        time: ' 10:00 ',
        contact: ' 9448131963 ',
        registered: false
    },
    '0112': {
        name: "Slow Drag",
        desc: "Carry your own bikes (boys) and scooty (girls). Last one reaching the line wins. Multiple rounds",
        regis_confirmed: false,
        location: ' Street ',
        time: ' 11:00 ',
        contact: ' 8792329243 ',
        registered: false
    },
    '0113': {
        name: "Kannada Dumbcharades",
        desc: "3 in a team. Standard dumb charades rules apply. No speaking. 1 partcipant will mime other 2 guess",
        regis_confirmed: false,
        location: ' CS/IS block ',
        time: ' 9:00 ',
        contact: ' 9739310656 ',
        registered: false
    },
    '0114': {
        name: "Kannada Anthyakshari",
        desc: "Team of 2 members. Prelims will be written round. Top scoring teams will be selected for finals. Coordinator's decision is final",
        regis_confirmed: false,
        location: ' CS/IS block ',
        time: ' 11:00 ',
        contact: ' 9739310656 ',
        registered: false
    },
    '0115': {
        name: "Gaanchaali Bidi Kannada Maathaadi",
        desc: "It's a solo event where the topic will be given on the spot. 5 minute preparation time. Speak in Kannada for 2 minutes but the timer stops as soon as you utter a Non-Kannada word. Judge's decision is final",
        regis_confirmed: false,
        location: ' CS/IS block ',
        time: ' 13:00 ',
        contact: ' 9739310656 ',
        registered: false
    },
    '0116': {
        name: "Vocal Classical Music Solo Prelims",
        desc: "Solo event. Time limit of 2+1 minutes. Any form of Hindustani or Carnatic classical music. No karaoke. 15 singers shall move on to the 2nd round",
        regis_confirmed: false,
        location: ' ECE Block LVL 1 ',
        time: ' 9:00 ',
        contact: ' 7022153497 ',
        registered: false
    },
    '0117': {
        name: "Vocal Light Music Solo Prelims",
        desc: "Solo event. Time limit of 2+1 minutes. No karaoke. Indian or non-filmic song can be sung. No Western music. Top 15 singers shall move on to second round. Indian filmic or non-filmic songs can be sung",
        regis_confirmed: false,
        location: ' ECE Block LVL 1 ',
        time: ' 9:00 ',
        contact: ' 8722580150 ',
        registered: false
    },
    '0118': {
        name: "Antichess",
        desc: "Solo event wherein standard rules of anti-chess apply. Matches are knockout. Time limit may or may not be present, depending on the event coordinator",
        regis_confirmed: false,
        location: ' MCA/CS/IS Lab ',
        time: ' 9:00 ',
        contact: ' 9880833798 ',
        registered: false
    },
    '0119': {
        name: "Mini Militia",
        desc: "Team consisting of 4 members. Match duration is 7 minutes. Team with maximum wins after allotted time will proceed to the finals. It will be direct elimination. Unlimited entries for the event",
        regis_confirmed: false,
        location: ' MCA/CS/IS Lab ',
        time: ' 9:00 ',
        contact: ' 8884834111 ',
        registered: false
    },
    '0120': {
        name: "FIFA",
        desc: "Solo event with difficulty level being legendary, 4 minutes per half. Elimination based on number of goals scored per team. Penalty shootout in case of a draw. No time will be allotted for practicing. Gamers can get their own joysticks and keyboards",
        location: ' MCA/CS/IS Lab ',
        time: ' 9:00 ',
        contact: ' 8277024701 ',
        fav: false
    },
    '0121': {
        name: "Counterstrike",
        desc: "Team of 5 members. 1st Round will be a race to 5 wins in the 1000$ map. Direct elimination. Consequent rounds will be on de_dust2, de_train and de_inferno. No practice session. Gamers can get their own mouse or joystick",
        regis_confirmed: false,
        location: ' MCA/CS/IS Lab ',
        time: ' 9:00 ',
        contact: ' 8904471865 ',
        registered: false
    },
    '0201': {
        name: "Beg Borrow Steal",
        desc: "2 in a team. No cell phones bikes or cash allowed. Total of 10 rounds. Further rules to be explained on the spot",
        regis_confirmed: false,
        location: ' Field ',
        time: ' 09:00 ',
        contact: ' 9035491661 ',
        registered: false
    },
    '0202': {
        name: "Air Crash",
        desc: "Team of 3 members. First round is written. Top scoring teams move to final. Quiz is about Karnataka and Kannadigas. Cash prize for top 2 teams",
        regis_confirmed: false,
        location: ' EC Block ',
        time: ' 09:00 ',
        contact: ' 9739310656 ',
        registered: false
    },
    '0203': {
        name: "Game Of Thrones Quiz",
        desc: "3 per team. Prelims consists of two rounds. Questions pertaining to Game Of Thrones TV series only (Season 1 to Season 5). Quiz master will explain the rules for finals",
        regis_confirmed: false,
        location: ' Mech Block lvl3 ',
        time: ' 09:00 ',
        contact: ' 7406659227 ',
        registered: false
    },
    '0204': {
        name: "Crime Polis",
        desc: "3 per team. Crime scene provided. Definite number of rounds wherein clues of the crime are deciphered. Team that finishes all rounds wins",
        regis_confirmed: false,
        location: ' Main stage ',
        time: ' 09:00 ',
        contact: ' 9886299824 ',
        registered: false
    },
    '0205': {
        name: "Solo Dance",
        desc: "Solo event. 3+1 minutes. Either western or eastern form of dance. No vulgarity",
        regis_confirmed: false,
        location: ' Admin Block ',
        time: ' 10:00 ',
        contact: ' 9036774789 ',
        registered: false
    },
    '0206': {
        name: "Sketch & Paint",
        desc: "Solo event. Required materials should be brought by participants. Sheets shall be provided. On the spot topics. Duration is 90 min",
        regis_confirmed: false,
        location: ' Mech Block ',
        time: ' 10:00 ',
        contact: ' 8197334611 ',
        registered: false
    },
    '0207': {
        name: "Beat The Heat",
        desc: "Solo event. 2 rounds. No instruments allowed. Time limit is 2 minutes. Qualified participants will have beatbox sessions of 90 seconds each",
        regis_confirmed: false,
        location: ' EEE/IT Block ',
        time: ' 10:00 ',
        contact: ' 9900022559 ',
        registered: false
    },
    '0208': {
        name: " Hindi Anthyakshari",
        desc: "3 per team. Prelims consist of four rounds where four teams will be selected. Finals consists of 3 rounds. Two winners will be rewarded",
        regis_confirmed: false,
        location: ' Main Stage ',
        time: ' 10:00 ',
        contact: ' 9108909361 ',
        registered: false
    },
    '0209': {
        name: "Air Crash",
        desc: "Solo event with on spot registration. Common Air Crash rules apply. Series of elimination rounds. Rules will be explained by judge",
        regis_confirmed: false,
        location: ' Edusat Hall ',
        time: ' 11:00 ',
        contact: ' 8050421256 ',
        registered: false
    },
    '0210': {
        name: "Dumb Charades",
        desc: "Maximum of 3 members per team. Prelims round is included. Finals for top 6 teams. Common rules for Dumb Charades apply",
        regis_confirmed: false,
        location: ' CS/IS Block ',
        time: ' 11:00 ',
        contact: ' 7411228907 ',
        registered: false
    },
    '0211': {
        name: "K'nataka Quiz",
        desc: "Team of 3 members. First round is written round. Top scoring teams move to final. Quiz is about Karnataka and Kannadigas. Cash prize for top 2 teams",
        regis_confirmed: false,
        location: ' EEE/IT block ',
        time: ' 11:00 ',
        contact: ' 8050421256 ',
        registered: false
    },
    '0212': {
        name: "Concept Presentation",
        desc: "Team of 2 members. Time limit of 4+2 minutes. Points rewarded for uniqueness of concept",
        regis_confirmed: false,
        location: ' Admin Block ',
        time: ' 12:00 ',
        contact: ' 9916807522 ',
        registered: false
    },
    '0213': {
        name: "Street Play",
        desc: "Max 12 members per team. Time limit of 10+2 minutes. Props allowed, recorded music not allowed. Vulgarity results in disqualification",
        regis_confirmed: false,
        location: ' Field ',
        time: ' 12:00 ',
        contact: ' 8867541575 ',
        registered: false
    },
    '0214': {
        name: "Bomb Diffusion",
        desc: "2 per team in the first round with a duration of 45 minutes. Elimination round conducted. Round 2 is diffusion where 6 teams will move on to the finals",
        regis_confirmed: false,
        location: ' Mech Block ',
        time: ' 12:00 ',
        contact: ' 8867840160 ',
        registered: false
    },
    '0215': {
        name: "Tech-Expo",
        desc: "Any type of robot is allowed. 3 per team. Best team selected based on robot and presentation",
        regis_confirmed: false,
        location: ' EC Block ',
        time: ' 12:00 ',
        contact: ' 9886299824 ',
        registered: false
    },
    '0216': {
        name: "60 Seconds To Fame",
        desc: "Solo event. Time limit of 1 minute. No vulgarity",
        regis_confirmed: false,
        location: ' EEE/IT Block ',
        time: ' 13:00 ',
        contact: ' 9341948012 ',
        registered: false
    },
    '0217': {
        name: "Street Dance ",
        desc: "Round 1 shall be a showcase round. Round 2 will be battle round. All rules of battle crew shall apply",
        regis_confirmed: false,
        location: ' Mech Block ',
        time: ' 14:00 ',
        contact: ' 9902215623 ',
        registered: false
    },
    '0218': {
        name: "General Quiz",
        desc: "3 per team. Prelims is a written round. Quiz master shall explain rules",
        regis_confirmed: false,
        location: ' Placement Cell ',
        time: ' 14:00 ',
        contact: ' 9036199499 ',
        registered: false
    },
    '0219': {
        name: "Band Wars",
        desc: "3-10 in a team. 15+5 minutes(including setup) is given. No restriction on genre. 5-piece drum kit, mics, cable and amplifier will be provided",
        regis_confirmed: false,
        location: ' Main Stage ',
        time: ' 15:00 ',
        contact: ' 9902643437 ',
        registered: false
    }
};

export default allEvents;
