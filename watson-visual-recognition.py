import json
from os.path import join, dirname
from watson_developer_cloud import VisualRecognitionV3

visual_recognition = VisualRecognitionV3('2016-05-20',
    api_key='Your_api_key')

"""
To create a custom classifier, uncomment out lines 22-27, and make the appropriate revisions to benefit what you need.
To print a list of custom classifiers uncomment out line 30 (Use this to also look at status of classifiers)
To look at the specifics of one of the classifiers uncomment out line 34, and make the appropriate changes
To delete a classifier uncomment out line 39, and make appropriate changes.
"""


# The line below is an example of how to classify an image.
# Still trying to figure out how to classify local images.
# print(json.dumps(visual_recognition.classify(
# images_url='https://img0.etsystatic.com/000/0/6354216/il_fullxfull.333007642.jpg'), indent=2))

# The code below is used to create custom classifiers
# with open(join(dirname(__file__), '1968.zip'), 'rb') as sixtyeight, \
#     open(join(dirname(__file__), '1969.zip'), 'rb') as sixtynine, \
#     open(join(dirname(__file__), 'non_baseball_cards.zip'), 'rb') as non_baseball:
#     print(json.dumps(visual_recognition.create_classifier('baseball_card', sixtyeight_positive_examples=sixtyeight,
#                                                           sixtynine_positive_examples=sixtynine,
#                                                           negative_examples=non_baseball), indent=2))

# The following code is used to print a list of custom classifiers
# print(json.dumps(visual_recognition.list_classifiers(), indent=2))


# Print out specific information about one classifier
# print(json.dumps(visual_recognition.get_classifier('typewriter_1123441466'), indent=2))


# The following codes is used to delete classifiers but you first have to print the list of custom classifiers
# in order to obtain the classifier id
# print(json.dumps(visual_recognition.delete_classifier(classifier_id='baseball_card_914789613'), indent=2))
