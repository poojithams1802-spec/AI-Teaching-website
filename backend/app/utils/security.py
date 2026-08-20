import hashlib
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str) -> str:
    password_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
    return pwd_context.hash(password_hash)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_hash = hashlib.sha256(
        plain_password.encode("utf-8")
    ).hexdigest()

    return pwd_context.verify(password_hash, hashed_password)