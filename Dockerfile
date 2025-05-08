FROM python:3.13-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ADD .python-version /app/
ADD pyproject.toml /app/
ADD uv.lock /app/
ADD README.md /app/
ADD src /app/src

WORKDIR /app
RUN uv sync --locked

CMD ["uv", "run", "helpdeskassistant"]