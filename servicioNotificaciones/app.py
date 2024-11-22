import pika

def main():
    # Conectar a RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Declarar la cola
    channel.queue_declare(queue='notificaciones')

    # Callback para procesar mensajes
    def callback(ch, method, properties, body):
        print(f"Notificación recibida: {body.decode('utf-8')}")

    # Configurar el consumidor
    channel.basic_consume(queue='notificaciones', on_message_callback=callback, auto_ack=True)

    print('Esperando mensajes. Presiona CTRL+C para salir.')
    channel.start_consuming()

if __name__ == "__main__":
    main()
