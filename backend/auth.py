from fastapi import Depends, HTTPException
from fastapi_clerk import Clerk

clerk = Clerk(secret_key="your_clerk_secret_key")

def get_current_user(user=Depends(clerk.user)):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user
