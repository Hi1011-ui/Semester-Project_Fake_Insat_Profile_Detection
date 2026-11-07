def username_numeric_ratio(username: str) -> float:
    if not username:
        return 0.0
    digits = sum(c.isdigit() for c in username)
    return digits / len(username)

def fullname_word_count(fullname: str) -> int:
    if not fullname:
        return 0
    return len(fullname.split())

def fullname_numeric_ratio(fullname: str) -> float:
    if not fullname:
        return 0.0
    digits = sum(c.isdigit() for c in fullname)
    return digits / len(fullname)

def name_equals_username(fullname: str, username: str) -> int:
    """
    Checks if fullname equals username after converting both to lowercase and removing spaces.
    Dataset documentation doesn't specify normalization, but typical user behavior
    and robust ML models expect 'John Doe' and 'johndoe' to match.
    """
    if not fullname or not username:
        return 0
    clean_full = fullname.lower().replace(" ", "")
    clean_user = username.lower().replace(" ", "")
    return 1 if clean_full == clean_user else 0

def description_length(bio: str) -> int:
    if not bio:
        return 0
    return len(bio)

def build_feature_vector(profile: dict, feature_order: list) -> list:
    """
    Assembles a feature vector in the exact order specified by feature_order
    (which should be read from model_metadata.json).
    """
    uname = profile.get('username', '')
    fname = profile.get('fullname', '')
    bio = profile.get('bio', '')
    
    # Calculate derived features
    derived = {
        'profile pic': profile.get('profile_pic', 0),
        'nums/length username': username_numeric_ratio(uname),
        'fullname words': fullname_word_count(fname),
        'nums/length fullname': fullname_numeric_ratio(fname),
        'name==username': name_equals_username(fname, uname),
        'description length': description_length(bio),
        'external URL': profile.get('external_url', 0),
        'private': profile.get('private', 0),
        '#posts': profile.get('posts', 0),
        '#followers': profile.get('followers', 0),
        '#follows': profile.get('following', 0)
    }
    
    # Construct ordered vector
    vector = [derived.get(feature, 0) for feature in feature_order]
    return vector
