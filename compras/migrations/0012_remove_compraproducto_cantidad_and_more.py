# Generated by Django 5.0.7 on 2024-08-17 21:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('compras', '0011_remove_compraproducto_compra'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='compraproducto',
            name='cantidad',
        ),
        migrations.AlterModelTable(
            name='compraproducto',
            table=None,
        ),
    ]
