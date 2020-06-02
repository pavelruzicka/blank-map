<div class="controls">
  <div class="controls__unit is-size-5">
    <?php require "src/icons/pin.svg" ?>
    <span id="next"></span>
  </div>
  <div class="controls__unit is-size-5">
    <span class="controls__remaining" id="remaining"></span>
    /
    <span class="controls__total" id="total"></span>
  </div>
  <div class="controls__unit is-size-5">
    <span id="time">5:00</span>
    <?php require "src/icons/clock.svg" ?>
  </div>
</div>
<div id="map">
  <?php require "src/maps/usa.svg" ?>
</div>
<div class="buttons">
  <button class="has-text-weight-semibold" id="btnBorders">
    <?php require "src/icons/square.svg" ?>
    <span></span>
  </button>
  <button class="has-text-weight-semibold" id="btnMinefield">
    <?php require "src/icons/pointer.svg" ?>
    <span></span>
  </button>
  <button class="has-text-weight-semibold" title="New game" id="btnRestart">
    <?php require "src/icons/reload.svg" ?>
    <span>New game</span>
  </button>
</div>
