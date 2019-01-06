import network
import machine
import dht
import webrepl
import urequests
import time

host = 'dorothy_01'

sta_if = network.WLAN(network.STA_IF)
if not sta_if.isconnected():
    print('connecting to network...')
    sta_if.active(True)
    sta_if.connect('Thompson Creek Yacht Club', 'winecountry')
    while not sta_if.isconnected():
        pass
print('network config:', sta_if.ifconfig())

webrepl.start()

d = dht.DHT22(machine.Pin(2)) #, machine.Pin.IN, machine.Pin.PULL_UP))

print("Measuring.")

retry = 0
while retry < 10:
    try:
        d.measure()
        print('posting')
        break
    except:
        retry = retry + 1
        print(".", end = "")
        time.sleep(2)

urequests.post("http://192.168.1.46:8086/write?db=home", data="temperature,host=" + host + " value=" + str(d.temperature()))
urequests.post("http://192.168.1.46:8086/write?db=home", data="humidity,host=" + host + " value=" + str(d.humidity()))

print("DONE!!!!")
