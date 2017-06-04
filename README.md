This code is for Collexion's AI Demo.

There is a lot of code here to deal with the low accuracy of the training of the classifiers.
This occurred because I had to collect all the images and I just didn't have sufficient time to collect more than like 800 images.

It is a simple application that allows the user to plug in image URL's into the input box and then send it through IBM Watson's Visual Recognition. Since this demo is specific to certain items, the code's logic reflects that.
I decided to include IBM's default classifiers but I hardcoded a bypass for specific ones that clash with my not as accurate classifiers.

The python script that is used to train the Visual Recognition V3 network is not specific to this project, just plug in your api key and uncomment out the lines that you want to use. To actually train this you need to install the following library:

watson_developer_cloud

You can simply pip install it if you wish.

