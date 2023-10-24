/*
	Esp32 Websockets Client

	This sketch:
        1. Connects to a WiFi network
        2. Connects to a Websockets server
        3. Sends the websockets server a message ("Hello Server")
        4. Prints all incoming messages while the connection is open

	Hardware:
        For this sketch you only need an ESP32 board.

	Created 15/02/2019
	By Gil Maimon
	https://github.com/gilmaimon/ArduinoWebsockets

*/

#include <ArduinoWebsockets.h>
#include <WiFi.h>
#include "FastLED.h"

#define NUM_LEDS 1024
#define DATA_PIN 13

CRGB leds[NUM_LEDS];

const char* ssid = "Simpson"; //Enter SSID
const char* password = "22222222"; //Enter Password
const char* websockets_server_host = "188.225.60.209"; //Enter server adress
const uint16_t websockets_server_port = 81; // Enter server port
bool canNextMessage = 1;
int jj = 0;

using namespace websockets;
WebsocketsClient client;

void onEventCallback(WebsocketsEvent event, String data) {
  if(event == WebsocketsEvent::ConnectionOpened) {
  } else if(event == WebsocketsEvent::ConnectionClosed) {
    // tryConnect();
  } else if(event == WebsocketsEvent::GotPing) {
    client.pong();
  } else if(event == WebsocketsEvent::GotPong) {
    client.ping();
  }
}

void onMessageCallback(WebsocketsMessage message)
{
  canNextMessage = 0;
  Serial.println("mes");

  if (message.isEmpty())
  {
    return;
  }

  const uint32_t length = message.length();
  const char *data = message.c_str();

  for (uint32_t i = 0; i < length; i += 4)
  {
    leds[i] = CRGB(
        data[i + 1] - 0,
        data[i + 2] - 0,
        data[i + 3] - 0);
  }

  FastLED.show();
  canNextMessage = 1;
}

void setup() {
    Serial.begin(115200);
    // Connect to wifi
    WiFi.begin(ssid, password);

    // Wait some time to connect to wifi
    for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
        Serial.print(".");
        delay(1000);
    }

    // Check if connected to wifi
    if(WiFi.status() != WL_CONNECTED) {
        Serial.println("No Wifi!");
        return;
    }

    Serial.println("Connected to Wifi, Connecting to server.");
    // try to connect to Websockets server
    bool connected = client.connect(websockets_server_host, websockets_server_port, "/");
    if(connected) {
        Serial.println("Connected!");
        client.send("Hello Server");
    } else {
        Serial.println("Not Connected!");
    }
    
    // run callback when messages are received
    client.onMessage(onMessageCallback);
    // client.onEvent(onEventCallback);

    delay(2000);
    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
}

void loop() {
    if(client.available() && canNextMessage == 1) {
        Serial.println(jj++);
        client.poll();
        client.ping();
    } else {
      bool connected = client.connect(websockets_server_host, websockets_server_port, "/");
      
      if(connected) {
        Serial.println("Connected!");
      } else {
        Serial.println("Not Connected!");
      }
    }

    delay(1500);
}