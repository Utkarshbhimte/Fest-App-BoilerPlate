Awesome Event '17
-----------------

Basic Workflows

When recieving money and confirming registration,
* Get the code by QR or manually [getDataFromInput, getDataFromQR]
* Open a FirebaseBuyerRef => `users/${buyer's uid}/' [confirmTransaction(uid, event)]
* Push the event id to its key registeredEvents
* The Schedule Tab get renders the changes on the user's schedule.


Functions and their task

[openModal, openAdminModal, closeModal, afterOpenAdminModal] => These are like componentWillMount, componentWillUnmount, componentDidMount for the Modals
[getAdminAccess] => (returns boolean) whether the user is admin or not
[startScan] => Initiates the Scan
[getDataFromQR, getDataFromInput] => gathers data for registeration returns uid, key
[checkConfirmaiton(event_key, uid)] => (returns boolean) checks in array [events.participants] for uid


Firebase Refs

{firebaseEventsRef} => binds at Component Mount and End at Component Unmount,
                        syncs the '/events' to this.state.events
{firebaseUserRef} => binds at Component Mount and End at Component Unmount,
                        syncs the '/user/${profile.uid}' to this.state.profile
{firebaseBuyerRef} => binds at confirmTransaction and End at confirmTransaction,
                        syncs the '/user/${data.uid}' to this.state.admin_buyer


Things to work on
-----------------
* Ping the admin when we the registeration is confirmed
* Notify the participant when we the registeration is confirmed
* Change the recieve payemnt button to FAB


Deploying to gh-pages
---------------------
git subtree push --prefix dist origin gh-pages
