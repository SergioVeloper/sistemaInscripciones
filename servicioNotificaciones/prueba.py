import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='notificaciones')
channel.basic_publish(exchange='', routing_key='notificaciones', body='Prueba de notificación')

print("Mensaje enviado.")
connection.close()
