"""
import requests

url = 'https://kauth.kakao.com/oauth/token'
rest_api_key = 'ab79f921d2419ee1d45008d9a7aa65a7'
redirect_uri = 'https://example.com/oauth'
authorize_code = '6qkI8LVtZedXPx46aR3cpULQI16HkmRAoSdFzFqcutuSP0zBa_LIZgAAAAQKKiVSAAABk82KkUwp9hBbJybEWQ'

data = {
    'grant_type':'authorization_code',
    'client_id':rest_api_key,
    'redirect_uri':redirect_uri,
    'code': authorize_code,
    }

response = requests.post(url, data=data)
tokens = response.json()
print(tokens)

# json 저장
import json

with open("kakao_code.json","w") as fp:
    json.dump(tokens, fp)

"""
import requests
import json


with open("kakao_code.json","r") as fp:
    tokens = json.load(fp)
	
print(tokens)

url= "https://kapi.kakao.com/v2/api/talk/memo/send"
friend_url = "https://kapi.kakao.com/v1/api/talk/friends"
send_url = "https://kapi.kakao.com/v1/api/talk/friends/message/default/send"

template_id = 115355


# kapi.kakao.com/v2/api/talk/memo/default/send 
#	https://kapi.kakao.com/v1/api/talk/friends/message/default/send 

headers={
    "Authorization" : "Bearer " + tokens["access_token"]
	
}


data={
    "template_id": template_id
}



response = requests.post(url, headers=headers, data=data)

print(response.json())
response.status_code


print(response.status_code)
if response.json().get('result_code') == 0:
	print('메시지를 성공적으로 보냈습니다.')
else:
	print('메시지를 성공적으로 보내지 못했습니다. 오류메시지 : ' + str(response.json()))