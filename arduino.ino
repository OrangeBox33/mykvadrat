#include <WiFi.h>
#include <WebSocketsClient.h>
#include "FastLED.h"

#define NUM_LEDS 256
#define DATA_PIN 13

CRGB leds[NUM_LEDS];

const char* ssid = "AGA_slow";
const char* password = "enchanter";
const char* serverIp = "5.44.46.7";
const uint16_t serverPort = 81;
const char* serverURL = "/";

const unsigned long timeIntervall = 15*60*1000;
unsigned long timeStamp = 0;

WebSocketsClient webSocket;

// Serial.println(" ");


void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_BIN && length > 0 ) {
    Serial.println("bin");
    for (uint32_t i = 1; i < length; i += 4) {
      leds[payload[i]] = CRGB(
        payload[i+1] - 0,
        payload[i+2] - 0,
        payload[i+3] - 0
      );
    }

    FastLED.show();
  }

  if (type == WStype_DISCONNECTED) {
    Serial.println("WStype_DISCONNECTED");
  }
}





void setup() {
    Serial.begin(115200);

    WiFi.begin(ssid, password);


    for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
        Serial.print(".");
        delay(1000);
    }
    if(WiFi.status() != WL_CONNECTED) {
        Serial.println("No Wifi!");
        return;
    }
    Serial.println("Connected to Wifi, Connecting to server.");

    webSocket.begin(serverIp, serverPort, serverURL);
	  webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(3000);
    webSocket.enableHeartbeat(30000, 1000, 100);

    delay(2000);
    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
}

void loop() {
  webSocket.loop();
  // Serial.print(".");
  // delay(1000);

  if(millis() - timeStamp > timeIntervall ){

    timeStamp = millis();  // reset the timer
  }

  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("wifi not connected");
    delay(2000);
    setup();
  }

  // delay(400);
}