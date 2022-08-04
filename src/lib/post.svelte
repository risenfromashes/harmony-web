<script>
  import { scale } from "svelte/transition";
  export let poster = "sadat";
  export let time = "30-07-2022 10:51PM"; //when it was posted
  export let post =
    "Hello world, how are you? My name is Sadat and I want to introduce myself.";
  let showComments = false;

  $: showCommentStatement = showComments ? "Hide Comments" : "Show Comments";
</script>

<div class="card cf" in:scale={{ duration: 300 }}>
  <div class="card__head">
    <img
      src="https://www.gravatar.com/avatar/{poster.length}?s=47&d=robohash"
      alt={poster}
      class="card__profile_photo"
    />
    <h5 class="card__username">{poster}</h5>
  </div>

  <div class="card__description">{post}</div>

  <div class="card__footer">
    <p class="card__comments">
      {showCommentStatement}
    </p>

    <p class="card__date">{time}</p>
  </div>
</div>

<style>
  .card {
    width: 98%;
    padding: 4px;
    margin-top: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 3px solid #5a5553;
    box-shadow: 13px 13px 1px 1px #5a5553;
    background: linear-gradient(
      360deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(48, 30, 60, 1) 0%
    );
  }

  .card__head {
    padding: 13px;
    margin: 3px 0 4px 0;
  }

  .card__like {
    float: right;
    display: flex;
    padding: 5px;
    align-items: center;
  }

  .card__like_icon {
    color: #fff;
    padding: 5px;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: bold;
    margin-right: 5px;
    transition: transform 0.1s, color 0.1s;
  }

  .card__like_total {
    color: #fff;
    font-size: 1rem;
    margin-top: -6px;
    margin-right: 5px;
    letter-spacing: 1.4px;
    font-family: monospace;
  }

  .card__profile_photo {
    float: left;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 100%;
    border: 3px solid #858992;
  }

  .card__username {
    float: left;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    letter-spacing: 1.5px;
    text-decoration: none;
    margin: 17px 0 0 18px;
    transition: color 0.1s;
  }

  .card__description {
    padding: 9px;
    color: #fff;
    font-size: 1rem;
    margin-top: 48px;
    line-height: 25px;
    word-wrap: break-word;
    letter-spacing: 0.5px;
    white-space: pre-line;
    box-sizing: border-box;
  }

  .card__footer {
    padding: 14px;
    display: flex;
    color: #858992;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    font-family: monospace;
    justify-content: space-between;
  }

  .card__comments:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .card__like_icon:hover {
    color: #77ae3f;
    transform: scale(1.3);
  }

  .card__username:hover {
    color: #858992;
    text-decoration: underline;
  }

  .message {
    color: #fff;
    margin-top: 40px;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 30px;
    font-family: monospace;
  }

  hr {
    border: 1px solid #5a5553;
  }

  @media screen and (max-width: 599px) {
    .card {
      box-shadow: 10px 10px 1px 1px #5a5553;
    }

    hr {
      margin-top: 40px;
    }
  }

  @media screen and (min-width: 600px) {
    .card {
      margin-bottom: 54px;
    }

    .card__description {
      padding: 17px;
    }
  }

  @media screen and (min-width: 760px) {
    .card__username {
      font-size: 1rem;
    }

    .card__footer,
    .card__description {
      font-size: 0.9rem;
    }

    .card__like_total {
      font-size: calc(0.9rem - 2px);
    }
  }

  @media screen and (min-width: 1050px) {
    .card__username {
      margin: 15px 0 0 18px;
    }
  }

  @media screen and (min-width: 1200px) {
    .card__username {
      font-size: 0.9rem;
    }

    .card__description {
      font-size: calc(0.9rem - 1px + 0.5px);
    }

    .card__footer {
      font-size: 0.8rem;
    }
  }
</style>
