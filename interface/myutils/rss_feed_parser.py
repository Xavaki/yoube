import feedparser
import pprint 
import json

# channel_dict_db = {
#     "name", 
#     "videos" : [
#         {
#             "feed_attrs" : {
#                 "title", 
#                 "published", 
#                 "yt_videoid"
#             }
#             "ux_attrs" : {
#                 "watched", 
#             }
#         },
#     ],
#     "display?"
#     "errors"
#     
# }

def parse_rss_feeds():
    # 1. Read channel_dicts JSON file (from Supabase 1GB free file storage)
    # 2. Extract list of channel_ids to parse
    # 3. Parse channel objects
    # 4. Update on video upload
    # 5. Save updated JSON file

    fields_of_interest = [
        'title', 
        'published', 
        'yt_videoid',
    ]

    def generate_video_entry(video):
        simplified_video = {
            "feed_attrs" : {},
            "ux_attrs" : {
                "display" : True,
                "errors" : []
            }
        }
        for field in fields_of_interest:
            simplified_video["feed_attrs"][field] = video[field]
        
        return simplified_video


    # list of channels to read (from file)
    try:
        with open('interface/files/channel_objects.json', 'r') as file:
            saved_channels = json.load(file)
    except:
        saved_channels = {}
    with open('interface/files/channel_ids.json', 'r') as file:
        channel_ids = json.load(file)

    content_updated = False
    for cid in channel_ids: 
        channel_feed_url = f'https://www.youtube.com/feeds/videos.xml?channel_id={cid}'
        Feed = feedparser.parse(channel_feed_url)
        videos_feed = Feed.entries

        # error when reading feed for channel
        if not videos_feed:
            ...

        if cid in saved_channels: 
            saved_channel_dict = saved_channels[cid]
            if "name" not in saved_channel_dict:
                saved_channel_dict["name"] = videos_feed[1]["author"]
            saved_channel_dict_vids = [v["feed_attrs"]["yt_videoid"] for v in saved_channel_dict["videos"]]
            for video in videos_feed:
                vidid = video["yt_videoid"]
                if vidid in saved_channel_dict_vids:
                    # video already in db
                    pass
                else:
                    video_entry = generate_video_entry(video)
                    saved_channel_dict["videos"].append(video_entry)
                    content_updated = True

            saved_channels[cid] = saved_channel_dict
        else:
            content_updated = True
            channel_dict = {"name" : videos_feed[1]["author"], "videos" : [], "display" : True, "errors" : []}
            for video in videos_feed:
                video_entry = generate_video_entry(video)
                channel_dict["videos"].append(video_entry)
            saved_channels[cid] = channel_dict

    return saved_channels


# if __name__ == '__main__':
#     response = parse_rss_feeds()
#     with open('./channel_objects.json', 'w') as file:
#         json.dump(response, file)




        




